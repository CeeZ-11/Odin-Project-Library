const myLibrary = {};

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  const book = new Book(title, author, pages, read);
  myLibrary[title] = book;
  console.log("Book added:", book);

  clearForm();
  closeDialog();
  updateDisplay();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
}

function updateDisplay() {
  const contentDiv = document.getElementById("content");
  const searchTerm = document.getElementById("searchBox").value.toLowerCase();

  contentDiv.innerHTML = "";

  for (const title in myLibrary) {
    if (myLibrary.hasOwnProperty(title)) {
      const book = myLibrary[title];
      if (book.title.toLowerCase().includes(searchTerm)) {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("books");
        bookDiv.innerHTML = `
          <p><strong>Title:</strong> ${book.title}</p>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Pages:</strong> ${book.pages}</p>
          <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
          <button onclick="updateRead('${book.title}')">Update Read</button>
          <button onclick="removeBook('${book.title}')">Remove</button>
        `;
        contentDiv.appendChild(bookDiv);
      }
    }
  }
}

function updateRead(title) {
  const book = myLibrary[title];
  if (book) {
    book.read = !book.read;
    console.log("Book updated:", book);
    updateDisplay();
  }
}

function removeBook(title) {
  delete myLibrary[title];
  updateDisplay();
}

function setupEventListeners() {
  const addButton = document.getElementById("add-button");
  const showButton = document.querySelector("dialog + button");
  const closeButton = document.getElementById("close-button");
  const searchBox = document.getElementById("searchBox");

  // Set up event listeners with separate functions
  showButton.addEventListener("click", showDialog);
  closeButton.addEventListener("click", closeDialog);
  searchBox.addEventListener("input", updateDisplay);
  addButton.addEventListener("click", handleAddBook);
}

function showDialog() {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
}

function closeDialog() {
  const dialog = document.querySelector("dialog");
  dialog.close();
}

function handleAddBook() {
  addBookToLibrary();
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});
