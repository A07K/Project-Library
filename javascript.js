const dialog = document.getElementById("bookDialog");
const showButton = document.getElementById("showButton");
const createButton = document.getElementById("createButton");
const searchInput = document.getElementById("search");

const library = [];

// Function to display or hide the empty library message
function updateEmptyLibraryMessage() {
  const cardContainer = document.getElementById('cardContainer');
  if (library.length === 0) {
    cardContainer.innerHTML = '<p id="emptyMessage">Your Library is empty</p>';
  } else {
    const emptyMessage = document.getElementById('emptyMessage');
    if (emptyMessage) {
      emptyMessage.remove();
    }
  }
}

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Create" button closes the dialog and adds a new book
createButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("page").value;
  const read = document.getElementById("read").checked;

  // Create a new Book object
  const newBook = new Book(title, author, pages, read);

  // Add the new book to the library array
  library.push(newBook);

  // Create a card for the new book
  newBook.createCard();

  // Close the dialog
  dialog.close();

  // Reset the form
  document.getElementById("bookForm").reset();

  // Update the empty library message
  updateEmptyLibraryMessage();
});

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = library.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query)
  );
  displayBooks(filteredBooks);
});

// Function to display books
function displayBooks(books) {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = '';
  books.forEach(book => book.createCard());
  updateEmptyLibraryMessage(); // Update the empty library message after displaying books
}

// Book constructor function
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Adding a method to Book's prototype to create a card
Book.prototype.createCard = function() {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.innerHTML = `
    <h2>${this.title}</h2>
    <p class="authorC">${this.author}</p>
    <p class="pagesC">${this.pages} pg.</p>
    <p class="bothButton">
        <button class="toggle-read"><span class="read-status">${this.read ? "Read" : "Unread"}</span></button>
        <button class="delete-book">Delete</button>
    </p>
  `;
  document.getElementById('cardContainer').appendChild(card);
  const colorStat = card.querySelector(".read-status");

  const toggleReadButton = card.querySelector(".toggle-read");
  toggleReadButton.style.backgroundColor = this.read ? "#ACBE78" : "#D0554E";

  toggleReadButton.addEventListener("click", () => {
    this.read = !this.read;
    const readStatus = card.querySelector(".read-status");
    readStatus.textContent = this.read ? "Read" : "Unread";
    toggleReadButton.style.backgroundColor = this.read ? "#ACBE78" : "#D0554E";
  });

  const deleteButton = card.querySelector(".delete-book");
  deleteButton.addEventListener("click", () => {
    card.remove();
    const index = library.indexOf(this);
    if (index > -1) {
      library.splice(index, 1);
    }
    updateEmptyLibraryMessage(); // Update the empty library message after deleting a book
  });
};

/*Book.prototype.createCard = function() {
  const card = document.createElement("div");
  card.classList.add("book-card");
  card.innerHTML = `
    <h2>${this.title}</h2>
    <p>Author: ${this.author}</p>
    <p>Pages: ${this.pages}</p>
    <button class="toggle-read"><span class="read-status">${this.read ? "Read" : "Unread"}</span></button>
    <button class="delete-book">Delete</button>
  `;
  document.getElementById('cardContainer').appendChild(card);

  const toggleReadButton = card.querySelector(".toggle-read");
  const readStatus = card.querySelector(".read-status");

  // Set initial button color based on read state
  toggleReadButton.style.backgroundColor = this.read ? "#ACBE78" : "#D0554E";

  toggleReadButton.addEventListener("click", () => {
    this.read = !this.read;
    readStatus.textContent = this.read ? "Read" : "Unread";
    toggleReadButton.style.backgroundColor = this.read ? "#ACBE78" : "#D0554E"; // Update button color
  });

  const deleteButton = card.querySelector(".delete-book");
  deleteButton.addEventListener("click", () => {
    card.remove();
    const index = library.indexOf(this);
    if (index > -1) {
      library.splice(index, 1);
    }
  });
};*/


// Initial display of all books
displayBooks(library);
