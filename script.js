const myLibrary = [];

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
  myLibrary.push(book);
  console.log("Book added:", book);

  const dialog = document.querySelector("dialog");
  if (dialog) {
    dialog.close();
  }
}

const dialog = document.querySelector("dialog");
const addButton = document.getElementById("add-button");
const showButton = document.querySelector("dialog + button");
const closeButton = document.getElementById("close-button");

showButton.addEventListener("click", () => {
  dialog.showModal();
});

closeButton.addEventListener("click", () => {
  dialog.close();
});

addButton.addEventListener("click", addBookToLibrary);
