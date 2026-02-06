const library = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = status;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, status) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, status);
  library.push(book);
}

const createCard = () => {
    
}

addBookToLibrary("Hello", "John", 123, false);
addBookToLibrary("Goodbye", "Jane", 456, true);