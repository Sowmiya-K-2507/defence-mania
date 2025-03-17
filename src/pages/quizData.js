// quizData.js
const quizData = [
    {
      id: 1,
      title: "General Knowledge",
      questions: [
        { text: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
        { text: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Earth", "Jupiter"], answer: "Mars" },
        { text: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"], answer: "Leonardo da Vinci" },
        { text: "What is the largest ocean on Earth?", options: ["Pacific", "Atlantic", "Indian", "Arctic"], answer: "Pacific" },
        { text: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "Thailand", "South Korea"], answer: "Japan" },
        { text: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Cu"], answer: "Au" },
        { text: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
        { text: "What is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], answer: "Mount Everest" },
        { text: "What year did World War II end?", options: ["1945", "1939", "1944", "1946"], answer: "1945" },
        { text: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Osmium", "Oganesson", "Olivine"], answer: "Oxygen" },
        { text: "What is the largest mammal in the world?", options: ["Blue Whale", "African Elephant", "Giraffe", "Hippopotamus"], answer: "Blue Whale" },
        { text: "Which planet has the most moons?", options: ["Saturn", "Jupiter", "Uranus", "Neptune"], answer: "Saturn" },
        { text: "What is the capital of Canada?", options: ["Ottawa", "Toronto", "Vancouver", "Montreal"], answer: "Ottawa" },
        { text: "Who discovered penicillin?", options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Robert Koch"], answer: "Alexander Fleming" },
        { text: "Which is the smallest continent?", options: ["Australia", "Europe", "Antarctica", "South America"], answer: "Australia" }
      ]
    },
    {
      id: 2,
      title: "Science Quiz",
      questions: [
        { text: "What is the atomic number of Carbon?", options: ["6", "8", "12", "14"], answer: "6" },
        { text: "What is the powerhouse of the cell?", options: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"], answer: "Mitochondria" },
        { text: "What is the chemical formula for water?", options: ["H2O", "CO2", "NaCl", "CH4"], answer: "H2O" },
        { text: "What do you call the process by which plants make their food?", options: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"], answer: "Photosynthesis" },
        { text: "What is the unit of electric current?", options: ["Ampere", "Volt", "Ohm", "Watt"], answer: "Ampere" },
        { text: "Which of these is not a state of matter?", options: ["Energy", "Solid", "Liquid", "Gas"], answer: "Energy" },
        { text: "What is the closest planet to the Sun?", options: ["Mercury", "Venus", "Earth", "Mars"], answer: "Mercury" },
        { text: "What is the study of fossils called?", options: ["Paleontology", "Archaeology", "Geology", "Anthropology"], answer: "Paleontology" },
        { text: "What is the hardest natural substance on Earth?", options: ["Diamond", "Titanium", "Platinum", "Graphene"], answer: "Diamond" },
        { text: "What tissue connects muscle to bone?", options: ["Tendon", "Ligament", "Cartilage", "Epithelium"], answer: "Tendon" },
        { text: "What is the speed of light in a vacuum?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "200,000 km/s"], answer: "300,000 km/s" },
        { text: "Which blood type is known as the universal donor?", options: ["O-", "AB+", "B-", "A+"], answer: "O-" },
        { text: "What is the largest organ in the human body?", options: ["Skin", "Liver", "Brain", "Lung"], answer: "Skin" },
        { text: "What is the pH value of pure water?", options: ["7", "0", "14", "10"], answer: "7" },
        { text: "What is the primary function of white blood cells?", options: ["Fight infection", "Carry oxygen", "Blood clotting", "Regulate temperature"], answer: "Fight infection" }
      ]
    },
    {
      id: 3,
      title: "History Quiz",
      questions: [
        { text: "Which year did World War I begin?", options: ["1914", "1918", "1939", "1945"], answer: "1914" },
        { text: "Who was the first President of the United States?", options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], answer: "George Washington" },
        { text: "The ancient city of Rome was built on how many hills?", options: ["Seven", "Five", "Nine", "Three"], answer: "Seven" },
        { text: "Who was the first female Prime Minister of the United Kingdom?", options: ["Margaret Thatcher", "Theresa May", "Queen Victoria", "Queen Elizabeth II"], answer: "Margaret Thatcher" },
        { text: "Which civilization built the Machu Picchu complex in Peru?", options: ["Inca", "Maya", "Aztec", "Olmec"], answer: "Inca" },
        { text: "In which year did the Berlin Wall fall?", options: ["1989", "1991", "1987", "1993"], answer: "1989" },
        { text: "Who was the leader of the Soviet Union during the Cuban Missile Crisis?", options: ["Nikita Khrushchev", "Joseph Stalin", "Vladimir Lenin", "Mikhail Gorbachev"], answer: "Nikita Khrushchev" },
        { text: "The Renaissance period began in which country?", options: ["Italy", "France", "England", "Germany"], answer: "Italy" },
        { text: "Which pharaoh's tomb was discovered nearly intact in 1922?", options: ["Tutankhamun", "Ramses II", "Cleopatra", "Akhenaten"], answer: "Tutankhamun" },
        { text: "The Magna Carta was signed in which year?", options: ["1215", "1066", "1415", "1776"], answer: "1215" },
        { text: "Who was the first Emperor of China?", options: ["Qin Shi Huang", "Kublai Khan", "Emperor Wu", "Sun Yat-sen"], answer: "Qin Shi Huang" },
        { text: "Which event triggered the start of World War I?", options: ["Assassination of Archduke Franz Ferdinand", "German invasion of Poland", "Sinking of the Lusitania", "Treaty of Versailles"], answer: "Assassination of Archduke Franz Ferdinand" },
        { text: "Which ancient wonder was located in Alexandria?", options: ["The Lighthouse", "The Hanging Gardens", "The Colossus", "The Temple of Artemis"], answer: "The Lighthouse" },
        { text: "Who was the primary author of the Declaration of Independence?", options: ["Thomas Jefferson", "John Adams", "Benjamin Franklin", "George Washington"], answer: "Thomas Jefferson" },
        { text: "The Industrial Revolution began in which country?", options: ["Great Britain", "United States", "France", "Germany"], answer: "Great Britain" }
      ]
    },
    {
      id: 4,
      title: "Geography Quiz",
      questions: [
        { text: "Which is the largest continent by land area?", options: ["Asia", "Africa", "North America", "Europe"], answer: "Asia" },
        { text: "Which country has the most natural lakes?", options: ["Canada", "United States", "Russia", "Finland"], answer: "Canada" },
        { text: "The Great Barrier Reef is located off the coast of which country?", options: ["Australia", "Indonesia", "Philippines", "Japan"], answer: "Australia" },
        { text: "What is the capital of Brazil?", options: ["Brasília", "Rio de Janeiro", "São Paulo", "Salvador"], answer: "Brasília" },
        { text: "Which desert is the largest in the world?", options: ["Sahara", "Antarctic", "Arctic", "Gobi"], answer: "Antarctic" },
        { text: "Which mountain range separates Europe and Asia?", options: ["Ural Mountains", "Alps", "Himalayas", "Caucasus Mountains"], answer: "Ural Mountains" },
        { text: "Which country has the longest coastline in the world?", options: ["Canada", "Norway", "Australia", "Russia"], answer: "Canada" },
        { text: "Lake Baikal is located in which country?", options: ["Russia", "China", "Mongolia", "Kazakhstan"], answer: "Russia" },
        { text: "Which river flows through the Grand Canyon?", options: ["Colorado River", "Mississippi River", "Rio Grande", "Missouri River"], answer: "Colorado River" },
        { text: "What is the capital of Argentina?", options: ["Buenos Aires", "Santiago", "Lima", "Montevideo"], answer: "Buenos Aires" },
        { text: "The islands of Sumatra, Java, and Borneo belong to which country?", options: ["Indonesia", "Malaysia", "Philippines", "Thailand"], answer: "Indonesia" },
        { text: "Which is the smallest country in the world by area?", options: ["Vatican City", "Monaco", "Nauru", "San Marino"], answer: "Vatican City" },
        { text: "The Strait of Gibraltar connects the Atlantic Ocean to which sea?", options: ["Mediterranean Sea", "Red Sea", "Black Sea", "Caspian Sea"], answer: "Mediterranean Sea" },
        { text: "The city of Istanbul is located in which country?", options: ["Turkey", "Greece", "Egypt", "Bulgaria"], answer: "Turkey" },
        { text: "Which African country was formerly known as Abyssinia?", options: ["Ethiopia", "Somalia", "Sudan", "Kenya"], answer: "Ethiopia" }
      ]
    },
    {
      id: 5,
      title: "Sports Quiz",
      questions: [
        { text: "In which sport would you perform a slam dunk?", options: ["Basketball", "Volleyball", "Tennis", "Soccer"], answer: "Basketball" },
        { text: "How many players are there in a standard soccer team?", options: ["11", "9", "10", "12"], answer: "11" },
        { text: "Which country won the first FIFA World Cup in 1930?", options: ["Uruguay", "Brazil", "Argentina", "Italy"], answer: "Uruguay" },
        { text: "What is the national sport of Japan?", options: ["Sumo Wrestling", "Judo", "Karate", "Kendo"], answer: "Sumo Wrestling" },
        { text: "In which city were the first modern Olympic Games held?", options: ["Athens", "Paris", "London", "Rome"], answer: "Athens" },
        { text: "Which Grand Slam tennis tournament is played on clay courts?", options: ["French Open", "Wimbledon", "US Open", "Australian Open"], answer: "French Open" },
        { text: "How many rings are on the Olympic flag?", options: ["5", "4", "6", "3"], answer: "5" },
        { text: "Which sport uses the terms 'strike' and 'spare'?", options: ["Bowling", "Baseball", "Cricket", "Golf"], answer: "Bowling" },
        { text: "Who is the all-time leading scorer in NBA history?", options: ["LeBron James", "Kareem Abdul-Jabbar", "Michael Jordan", "Kobe Bryant"], answer: "LeBron James" },
        { text: "In which sport would you perform a 'floor routine'?", options: ["Gymnastics", "Figure Skating", "Diving", "Synchronized Swimming"], answer: "Gymnastics" },
        { text: "Which country has won the most Olympic gold medals in history?", options: ["United States", "Soviet Union", "China", "Great Britain"], answer: "United States" },
        { text: "What is the diameter of a basketball hoop in inches?", options: ["18", "16", "20", "24"], answer: "18" },
        { text: "In which sport would you use a 'shuttlecock'?", options: ["Badminton", "Tennis", "Racquetball", "Squash"], answer: "Badminton" },
        { text: "How many holes are played in a standard round of golf?", options: ["18", "9", "12", "24"], answer: "18" },
        { text: "Which martial art originated in Korea?", options: ["Taekwondo", "Judo", "Karate", "Kung Fu"], answer: "Taekwondo" }
      ]
    },
    {
      id: 6,
      title: "Music Quiz",
      questions: [
        { text: "Which band performed the album 'Dark Side of the Moon'?", options: ["Pink Floyd", "The Beatles", "Led Zeppelin", "The Rolling Stones"], answer: "Pink Floyd" },
        { text: "Which instrument has 47 strings and 7 pedals?", options: ["Concert Harp", "Piano", "Pipe Organ", "Electric Guitar"], answer: "Concert Harp" },
        { text: "Who composed 'The Four Seasons'?", options: ["Antonio Vivaldi", "Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven"], answer: "Antonio Vivaldi" },
        { text: "Which music genre originated in Jamaica in the late 1960s?", options: ["Reggae", "Hip Hop", "Jazz", "Blues"], answer: "Reggae" },
        { text: "Which singer was known as the 'King of Rock and Roll'?", options: ["Elvis Presley", "Michael Jackson", "Freddie Mercury", "John Lennon"], answer: "Elvis Presley" },
        { text: "How many lines does a standard musical staff have?", options: ["5", "4", "6", "7"], answer: "5" },
        { text: "Which musical term indicates to play softly?", options: ["Piano", "Forte", "Allegro", "Adagio"], answer: "Piano" },
        { text: "Which Beatles album features a zebra crossing on its cover?", options: ["Abbey Road", "Let It Be", "Sgt. Pepper's Lonely Hearts Club Band", "Revolver"], answer: "Abbey Road" },
        { text: "What instrument did Louis Armstrong play?", options: ["Trumpet", "Saxophone", "Clarinet", "Trombone"], answer: "Trumpet" },
        { text: "Which female artist released the album '21' in 2011?", options: ["Adele", "Taylor Swift", "Beyoncé", "Lady Gaga"], answer: "Adele" },
        { text: "Which of these is not a wind instrument?", options: ["Cello", "Flute", "Clarinet", "Saxophone"], answer: "Cello" },
        { text: "Who wrote the opera 'The Magic Flute'?", options: ["Wolfgang Amadeus Mozart", "Giuseppe Verdi", "Richard Wagner", "Johann Sebastian Bach"], answer: "Wolfgang Amadeus Mozart" },
        { text: "Which music festival started in 1970 on a dairy farm in New York?", options: ["Woodstock", "Coachella", "Glastonbury", "Lollapalooza"], answer: "Woodstock" },
        { text: "What is the national anthem of the United States called?", options: ["The Star-Spangled Banner", "America the Beautiful", "God Bless America", "My Country, 'Tis of Thee"], answer: "The Star-Spangled Banner" },
        { text: "Which percussion instrument consists of a metal bar bent into a triangle shape?", options: ["Triangle", "Cymbal", "Gong", "Tambourine"], answer: "Triangle" }
      ]
    },
    {
      id: 7,
      title: "Movies Quiz",
      questions: [
        { text: "Which film won the Best Picture Oscar in 2020?", options: ["Parasite", "1917", "Joker", "Once Upon a Time in Hollywood"], answer: "Parasite" },
        { text: "Who directed the movie 'Jaws'?", options: ["Steven Spielberg", "George Lucas", "Martin Scorsese", "Francis Ford Coppola"], answer: "Steven Spielberg" },
        { text: "Which actor played Iron Man in the Marvel Cinematic Universe?", options: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"], answer: "Robert Downey Jr." },
        { text: "Which film features the character Jack Dawson?", options: ["Titanic", "The Departed", "Inception", "The Great Gatsby"], answer: "Titanic" },
        { text: "What was the first feature-length animated film ever released?", options: ["Snow White and the Seven Dwarfs", "Pinocchio", "Fantasia", "Bambi"], answer: "Snow White and the Seven Dwarfs" },
        { text: "Which movie contains the quote 'May the Force be with you'?", options: ["Star Wars", "Star Trek", "The Matrix", "E.T."], answer: "Star Wars" },
        { text: "Which actress won an Oscar for her role in 'La La Land'?", options: ["Emma Stone", "Emma Watson", "Jennifer Lawrence", "Natalie Portman"], answer: "Emma Stone" },
        { text: "In 'The Matrix', what color pill does Neo take?", options: ["Red", "Blue", "Green", "Purple"], answer: "Red" },
        { text: "Which movie features a character named Forrest Gump?", options: ["Forrest Gump", "The Green Mile", "Cast Away", "Saving Private Ryan"], answer: "Forrest Gump" },
        { text: "Which country produces the most films annually?", options: ["India", "United States", "China", "Nigeria"], answer: "India" },
        { text: "Who directed the 1994 film 'Pulp Fiction'?", options: ["Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "Christopher Nolan"], answer: "Quentin Tarantino" },
        { text: "Which animated film features the song 'Let It Go'?", options: ["Frozen", "Moana", "Tangled", "The Little Mermaid"], answer: "Frozen" },
        { text: "Which actor has won the most Academy Awards for Best Actor?", options: ["Daniel Day-Lewis", "Jack Nicholson", "Tom Hanks", "Marlon Brando"], answer: "Daniel Day-Lewis" },
        { text: "Which film franchise features the character Harry Potter?", options: ["Harry Potter", "The Lord of the Rings", "The Chronicles of Narnia", "Fantastic Beasts"], answer: "Harry Potter" },
        { text: "What was the first Pixar film?", options: ["Toy Story", "A Bug's Life", "Monsters, Inc.", "Finding Nemo"], answer: "Toy Story" }
      ]
    },
    {
      id: 8,
      title: "Technology Quiz",
      questions: [
        { text: "Who is the co-founder of Microsoft along with Bill Gates?", options: ["Paul Allen", "Steve Jobs", "Steve Wozniak", "Mark Zuckerberg"], answer: "Paul Allen" },
        { text: "What does 'HTTP' stand for?", options: ["Hypertext Transfer Protocol", "Hypertext Technical Programming", "Hypertext Terminal Process", "Hypertext Transfer Programming"], answer: "Hypertext Transfer Protocol" },
        { text: "Which company created the iPhone?", options: ["Apple", "Samsung", "Google", "Microsoft"], answer: "Apple" },
        { text: "What year was the first email sent?", options: ["1971", "1981", "1991", "2001"], answer: "1971" },
        { text: "Which programming language was created by James Gosling?", options: ["Java", "Python", "C++", "JavaScript"], answer: "Java" },
        { text: "What does 'CPU' stand for?", options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Control Processing Unit"], answer: "Central Processing Unit" },
        { text: "Which company owns Android?", options: ["Google", "Apple", "Microsoft", "Samsung"], answer: "Google" },
        { text: "What does 'URL' stand for?", options: ["Uniform Resource Locator", "Universal Resource Locator", "Uniform Resource Link", "Universal Resource Link"], answer: "Uniform Resource Locator" },
        { text: "Which social media platform was founded by Mark Zuckerberg?", options: ["Facebook", "Twitter", "Instagram", "LinkedIn"], answer: "Facebook" },
        { text: "What is the main component of a computer that processes data?", options: ["CPU", "RAM", "Hard Drive", "Graphics Card"], answer: "CPU" },
        { text: "What is the world's most popular open-source operating system?", options: ["Linux", "Windows", "macOS", "Android"], answer: "Linux" },
        { text: "What technology is used to record cryptocurrency transactions?", options: ["Blockchain", "Cloud Computing", "Quantum Computing", "Virtual Reality"], answer: "Blockchain" },
        { text: "Which company developed the first commercially successful web browser?", options: ["Netscape", "Microsoft", "Google", "Apple"], answer: "Netscape" },
        { text: "What does 'IoT' stand for?", options: ["Internet of Things", "Internet of Technology", "Integration of Technology", "Input/Output Technology"], answer: "Internet of Things" },
        { text: "In what year was the first iPhone released?", options: ["2007", "2005", "2009", "2010"], answer: "2007" }
      ]
    },
    {
      id: 9,
      title: "Literature Quiz",
      questions: [
        { text: "Who wrote 'Pride and Prejudice'?", options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Virginia Woolf"], answer: "Jane Austen" },
        { text: "Which Shakespeare play features the character Ophelia?", options: ["Hamlet", "Macbeth", "Romeo and Juliet", "King Lear"], answer: "Hamlet" },
        { text: "Who is the author of 'The Great Gatsby'?", options: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "William Faulkner"], answer: "F. Scott Fitzgerald" },
        { text: "Which novel begins with the line 'It was the best of times, it was the worst of times'?", options: ["A Tale of Two Cities", "Great Expectations", "Oliver Twist", "David Copperfield"], answer: "A Tale of Two Cities" },
        { text: "Who wrote the 'Harry Potter' series?", options: ["J.K. Rowling", "Stephenie Meyer", "George R.R. Martin", "Suzanne Collins"], answer: "J.K. Rowling" },
        { text: "Which Greek poet wrote the Iliad and the Odyssey?", options: ["Homer", "Sophocles", "Aristotle", "Plato"], answer: "Homer" },
        { text: "Who is the author of 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "John Steinbeck", "William Faulkner"], answer: "Harper Lee" },
        { text: "Which dystopian novel was written by George Orwell?", options: ["1984", "Brave New World", "Fahrenheit 451", "The Handmaid's Tale"], answer: "1984" },
        { text: "Who wrote 'The Lord of the Rings'?", options: ["J.R.R. Tolkien", "C.S. Lewis", "Roald Dahl", "Philip Pullman"], answer: "J.R.R. Tolkien" },
        { text: "What is the name of the main character in 'Moby Dick'?", options: ["Ishmael", "Ahab", "Queequeg", "Starbuck"], answer: "Ishmael" },
        { text: "Which author created the character Sherlock Holmes?", options: ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "H.G. Wells"], answer: "Arthur Conan Doyle" },
        { text: "Who wrote 'War and Peace'?", options: ["Leo Tolstoy", "Fyodor Dostoevsky", "Anton Chekhov", "Ivan Turgenev"], answer: "Leo Tolstoy" },
        { text: "Which novel features the character Holden Caulfield?", options: ["The Catcher in the Rye", "The Great Gatsby", "To Kill a Mockingbird", "Lord of the Flies"], answer: "The Catcher in the Rye" },
        { text: "Who is the author of 'One Hundred Years of Solitude'?", options: ["Gabriel García Márquez", "Jorge Luis Borges", "Isabel Allende", "Julio Cortázar"], answer: "Gabriel García Márquez" },
        { text: "Which play features the characters Rosencrantz and Guildenstern?", options: ["Hamlet", "Macbeth", "Othello", "King Lear"], answer: "Hamlet" }
      ]
    },
    {
      id: 10,
      title: "Math Quiz",
      questions: [
        { text: "What is the value of π (pi) to two decimal places?", options: ["3.14", "3.15", "3.12", "3.16"], answer: "3.14" },
        { text: "What is the square root of 144?", options: ["12", "14", "16", "10"], answer: "12" },
        { text: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, ?", options: ["21", "24", "26", "20"], answer: "21" },
        { text: "What is the sum of angles in a triangle?", options: ["180 degrees", "90 degrees", "270 degrees", "360 degrees"], answer: "180 degrees" },
        { text: "What is the area of a circle with radius r?", options: ["πr²", "2πr", "πr", "2πr²"], answer: "πr²" },
        { text: "What is the value of 5 factorial (5!)?", options: ["120", "60", "24", "720"], answer: "120" },
        { text: "In a right triangle, what does the Pythagorean theorem state?", options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c²"], answer: "a² + b² = c²" },
        { text: "What is the perimeter of a square with side length 7?", options: ["28", "49", "14", "56"], answer: "28" },
        { text: "What is 3 raised to the power of 4?", options: ["81", "64", "27", "12"], answer: "81" },
        { text: "What is the formula for the volume of a cylinder?", options: ["πr²h", "4/3πr³", "lwh", "2πrh"], answer: "πr²h" },
        { text: "What is the slope of a horizontal line?", options: ["0", "1", "Undefined", "Infinity"], answer: "0" },
        { text: "What is the value of log₁₀(100)?", options: ["2", "10", "1", "100"], answer: "2" },
        { text: "If x = 3 and y = 4, what is the value of x² + y²?", options: ["25", "49", "16", "9"], answer: "25" },
        { text: "What is the formula for the area of a trapezoid?", options: ["½(a+b)h", "bh", "½bh", "ab"], answer: "½(a+b)h" },
        { text: "What is the result of 0 divided by any number (except 0)?", options: ["0", "1", "Undefined", "Infinity"], answer: "0" }
      ]
    }
  ];
  
  export default quizData;