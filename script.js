class Library {
  constructor() {
    this.books = {};
  }

  addBook(book) {
    this.books[book.title] = book;
    console.log("Book added:", book);
    this.updateDisplay();
  }

  removeBook(title) {
    delete this.books[title];
    this.updateDisplay();
  }

  updateReadStatus(title) {
    const book = this.books[title];
    if (book) {
      book.read = !book.read;
      console.log("Book updated:", book);
      this.updateDisplay();
    }
  }

  searchBooks(searchTerm) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "";

    for (const title in this.books) {
      if (this.books.hasOwnProperty(title)) {
        const book = this.books[title];
        if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          const bookDiv = document.createElement("div");
          bookDiv.classList.add("books");
          bookDiv.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
            <button onclick="library.updateReadStatus('${
              book.title
            }')">Update Read</button>
            <button onclick="library.removeBook('${
              book.title
            }')">Remove</button>
          `;
          contentDiv.appendChild(bookDiv);
        }
      }
    }
  }

  updateDisplay() {
    const searchTerm = document.getElementById("searchBox").value;
    this.searchBooks(searchTerm);
  }

  clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("read").checked = false;
  }
}

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const library = new Library();

function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  const book = new Book(title, author, pages, read);
  library.addBook(book);

  library.clearForm();
  closeDialog();
}

function setupEventListeners() {
  const addButton = document.getElementById("add-button");
  const showButton = document.querySelector("dialog + button");
  const closeButton = document.getElementById("close-button");
  const searchBox = document.getElementById("searchBox");

  showButton.addEventListener("click", showDialog);
  closeButton.addEventListener("click", closeDialog);
  searchBox.addEventListener("input", () => library.updateDisplay());
  addButton.addEventListener("click", addBookToLibrary);
}

function showDialog() {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
}

function closeDialog() {
  const dialog = document.querySelector("dialog");
  dialog.close();
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});
