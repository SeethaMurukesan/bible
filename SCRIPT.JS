document.addEventListener("DOMContentLoaded", function() {
  fetchBooks();
});

function fetchBooks() {
  const books = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
  ];

  const booksList = document.getElementById('books-list');
  books.forEach(book => {
    const listItem = document.createElement('li');
    const bookLink = document.createElement('a');
    bookLink.href = "#";
    bookLink.textContent = book;
    bookLink.addEventListener('click', () => fetchChapters(book));
    listItem.appendChild(bookLink);
    booksList.appendChild(listItem);
  });
}

function fetchChapters(book) {
  const chapterContent = document.getElementById('chapter-content');
  chapterContent.innerHTML = `<h2>${book}</h2>`;
  // Assume a max of 50 chapters for simplicity
  for (let i = 1; i <= 50; i++) {
    const chapterLink = document.createElement('a');
    chapterLink.href = "#";
    chapterLink.textContent = `Chapter ${i}`;
    chapterLink.addEventListener('click', () => fetchVerses(book, i));
    chapterContent.appendChild(chapterLink);
    chapterContent.appendChild(document.createElement('br'));
  }
}

function fetchVerses(book, chapter) {
  const chapterContent = document.getElementById('chapter-content');
  chapterContent.innerHTML = `<h2>${book} - Chapter ${chapter}</h2>`;
  fetch(`https://bible-api.com/${book}+${chapter}`)
    .then(response => response.json())
    .then(data => {
      data.verses.forEach(verse => {
        const verseElement = document.createElement('p');
        verseElement.textContent = `${verse.verse}: ${verse.text}`;
        chapterContent.appendChild(verseElement);
      });
    })
    .catch(error => console.error('Error fetching the Bible data:', error));
}
