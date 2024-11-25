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

function addBookToLibrary(event) {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const form = document.getElementById("add-book-form");

  // Prevent form submission for validation
  event.preventDefault();

  // Clear previous error messages
  clearErrorMessages();

  // Validate the fields
  let isValid = true;

  if (!title.checkValidity()) {
    showError(title, "Title is required and cannot be a number.");
    isValid = false;
  }

  if (!author.checkValidity()) {
    showError(author, "Author is required.");
    isValid = false;
  }

  if (!pages.checkValidity() || pages.value <= 0) {
    showError(pages, "Please enter a valid number of pages.");
    isValid = false;
  }

  if (isValid) {
    // If valid, create the book and add it to the library
    const read = document.getElementById("read").checked;
    const book = new Book(
      title.value,
      author.value,
      parseInt(pages.value),
      read
    );
    library.addBook(book);

    // Clear the form and close the dialog
    library.clearForm();
    closeDialog();
  }
}

function showError(inputElement, message) {
  const errorElement = document.getElementById(`${inputElement.id}-error`);
  errorElement.textContent = message;
}
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => {
    msg.textContent = "";
  });
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
