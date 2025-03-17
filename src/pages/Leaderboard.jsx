import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where, orderBy, Timestamp } from "firebase/firestore";
import { jsPDF } from "jspdf";
import { useAuthState } from "react-firebase-hooks/auth";
import autoTable from 'jspdf-autotable';

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("all");
  const [user] = useAuthState(auth);
  const [showReportOptions, setShowReportOptions] = useState(false);
  const [showCustomDateFilter, setShowCustomDateFilter] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showCurrentUserOnly, setShowCurrentUserOnly] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup event listener
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresRef = collection(db, "scores");
        const q = query(scoresRef, orderBy("score", "desc"));
        const data = await getDocs(q);
        const fetchedScores = data.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        setScores(fetchedScores);
        setFilteredScores(fetchedScores);
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [dateFilter, scores, showCurrentUserOnly]);

  const applyFilters = () => {
    let filtered = [...scores];
    
    // Apply date filter if not custom
    if (dateFilter !== "custom") {
      filtered = filterByDate(filtered, dateFilter);
    }
    
    // Apply user filter if toggled on
    if (showCurrentUserOnly && user) {
      filtered = filtered.filter(score => score.userId === user.email);
    }
    
    setFilteredScores(filtered);
  };

  const applyCustomDateFilter = () => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      // Set to end of day for the to date to include the entire day
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      
      let filtered = scores.filter(score => 
        score.timestamp >= from && score.timestamp <= to
      );
      
      // Apply user filter if toggled on
      if (showCurrentUserOnly && user) {
        filtered = filtered.filter(score => score.userId === user.email);
      }
      
      setFilteredScores(filtered);
    }
  };

  const filterByDate = (scoresArray, filter) => {
    const now = new Date();
    let filtered = [...scoresArray];

    if (filter === "lastDay") {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      filtered = filtered.filter(score => score.timestamp >= yesterday);
    } else if (filter === "lastWeek") {
      const lastWeek = new Date(now);
      lastWeek.setDate(lastWeek.getDate() - 7);
      filtered = filtered.filter(score => score.timestamp >= lastWeek);
    } else if (filter === "lastMonth") {
      const lastMonth = new Date(now);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filtered = filtered.filter(score => score.timestamp >= lastMonth);
    }

    return filtered;
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const parts = email.split("@");
    if (parts.length !== 2) return email;
    
    const name = parts[0];
    const domain = parts[1];
    
    const maskedName = name.substring(0, 2) + "*".repeat(name.length - 2);
    return `${maskedName}@${domain}`;
  };

  const generatePDF = () => {
    if (!user) return;

    try {
      // Create new jsPDF instance
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text("Defence Mania Leaderboard Report", 14, 22);
      
      // Add generation date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Add filter information
      let currentY = 38;
      
      if (dateFilter === "custom" && fromDate && toDate) {
        const filterText = `Date Filter: Custom Range (${new Date(fromDate).toLocaleDateString()} - ${new Date(toDate).toLocaleDateString()})`;
        doc.text(filterText, 14, currentY);
        currentY += 8;
      } else if (dateFilter !== "all") {
        const filterText = `Date Filter: ${dateFilter === "lastDay" ? "Last 24 Hours" : 
                           dateFilter === "lastWeek" ? "Last 7 Days" : 
                           "Last 30 Days"}`;
        doc.text(filterText, 14, currentY);
        currentY += 8;
      }
      
      if (showCurrentUserOnly) {
        doc.text(`Showing only: Current user (${maskEmail(user.email)})`, 14, currentY);
        currentY += 8;
      }

      // Prepare table data
      const tableColumn = ["Rank", "User", "Quiz", "Score", "Date"];
      const tableRows = filteredScores.map((score, index) => [
        (index + 1).toString(),
        maskEmail(score.userId),
        score.quizName || "General Quiz",
        score.score.toString(),
        score.timestamp.toLocaleDateString()
      ]);

      // Add table using autoTable plugin
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: currentY,
        theme: 'grid',
        headStyles: { fillColor: [58, 76, 58] }
      });

      // Determine filename
      let filenameFilter = "";
      if (dateFilter === "custom") {
        filenameFilter += `-${fromDate.replace(/-/g, '')}-to-${toDate.replace(/-/g, '')}`;
      } else if (dateFilter !== "all") {
        filenameFilter += `-${dateFilter}`;
      }
      
      if (showCurrentUserOnly) {
        filenameFilter += "-personal";
      }
      
      // Save the PDF
      doc.save(`defence-mania-leaderboard${filenameFilter}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    }
  };

  const handleDateFilterChange = (value) => {
    setDateFilter(value);
    setShowCustomDateFilter(value === "custom");
  };

  return (
    <div className="min-h-screen py-4 md:py-8 px-2 md:px-4 flex items-center justify-center bg-center bg-cover"
         style={{ backgroundImage: "url('/images/camo-bg.jpg')", backgroundColor: "#3a4c3a" }}>
      <div className="max-w-4xl w-full mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg overflow-hidden border-2 border-green-800">
        <div className="bg-green-800 py-3 md:py-4">
          <h1 className="text-xl md:text-2xl font-bold text-center text-white">Defence Mania Leaderboard</h1>
        </div>
        
        <div className="p-3 md:p-6">
          <div className="flex flex-col mb-6">
            <div className="w-full mb-4">
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex flex-wrap gap-2">
                  <select
                    className="flex-grow bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2"
                    value={dateFilter}
                    onChange={(e) => handleDateFilterChange(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="lastDay">Last 24 Hours</option>
                    <option value="lastWeek">Last 7 Days</option>
                    <option value="lastMonth">Last 30 Days</option>
                    <option value="custom">Custom Date Range</option>
                  </select>
                  
                  {user && (
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={showCurrentUserOnly}
                          onChange={() => setShowCurrentUserOnly(!showCurrentUserOnly)}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-800">My Scores Only</span>
                      </label>
                    </div>
                  )}
                </div>
                
                {user && (
                  <button 
                    onClick={generatePDF}
                    className="w-full md:w-auto mt-2 md:mt-0 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Leaderboard
                  </button>
                )}
              </div>
              
              {showCustomDateFilter && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                      <label className="text-sm text-green-800 w-full sm:w-auto">From:</label>
                      <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                      <label className="text-sm text-green-800 w-full sm:w-auto">To:</label>
                      <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full bg-green-50 border border-green-300 text-green-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-2"
                      />
                    </div>
                  </div>
                  <button
                    onClick={applyCustomDateFilter}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 text-sm rounded"
                  >
                    Apply Custom Date Range
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-700">Loading scores...</p>
            </div>
          ) : filteredScores.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-green-700">
              <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-100">
                  <tr>
                    <th scope="col" className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                      User
                    </th>
                    {!isSmallScreen && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                        Quiz
                      </th>
                    )}
                    <th scope="col" className="px-2 md:px-6 py-2 md:py-3 text-right text-xs font-medium text-green-900 uppercase tracking-wider">
                      Score
                    </th>
                    {!isSmallScreen && (
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-green-900 uppercase tracking-wider">
                        Date
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-200">
                  {filteredScores.map((score, index) => (
                    <tr key={score.id || index} className={index < 3 ? "bg-green-50" : ""}>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-6 w-6 md:h-8 md:w-8 rounded-full flex items-center justify-center ${
                            index === 0 ? "bg-yellow-500" : 
                            index === 1 ? "bg-gray-400" : 
                            index === 2 ? "bg-yellow-700" : "bg-green-100"
                          }`}>
                            <span className={`text-xs md:text-sm font-medium ${index < 3 ? "text-white" : "text-green-800"}`}>
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap">
                        <div className="text-xs md:text-sm font-medium text-gray-800">
                          {user && score.userId === user.email ? 
                            <span className="text-green-600 font-bold">You</span> : 
                            maskEmail(score.userId)}
                        </div>
                        {isSmallScreen && (
                          <div className="text-xs text-gray-500 mt-1">
                            {score.quizName || "General Quiz"} • {score.timestamp.toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      {!isSmallScreen && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-800">{score.quizName || "General Quiz"}</div>
                        </td>
                      )}
                      <td className="px-2 md:px-6 py-3 md:py-4 whitespace-nowrap text-right">
                        <div className="text-xs md:text-sm font-medium text-gray-800">{score.score}</div>
                      </td>
                      {!isSmallScreen && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-800">
                            {score.timestamp.toLocaleDateString()}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 md:py-8">
              <p className="text-gray-700">
                {showCurrentUserOnly ? 
                  "You don't have any scores for the selected time period." : 
                  "No scores available for the selected time period."}
              </p>
            </div>
          )}
        </div>
        
        {!user && (
          <div className="bg-green-50 p-3 md:p-4 border-t border-green-200">
            <p className="text-center text-xs md:text-sm text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Login to generate and download performance reports
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;