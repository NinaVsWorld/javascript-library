const library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = status;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  library.push(book);
}

const createCard = (book) => {
    card = document.querySelector(".card").cloneNode(true);
    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author").textContent = book.author;
    card.querySelector(".pages").textContent = book.pages;
    card.querySelector(".status").textContent = book.read;
    return card;
}

const displayBooks = () => {
    const page = document.querySelector(".reading");
    for (const book of library) {
        page.appendChild(createCard(book));
    }
}

addBookToLibrary("Hello", "John", 123, false);
addBookToLibrary("Goodbye", "Jane", 456, true);
displayBooks();