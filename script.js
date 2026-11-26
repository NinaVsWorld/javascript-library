class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
        this.id = crypto.randomUUID();
    }

    toggleReadStatus() { this.read = !this.read; }
    getBookID() { return this.id; }
    isRead() { return this.read; }
    getTitle() { return this.title; }
    getAuthor() { return this.author; }
    getPages() { return this.pages; }
}

class Library {
    constructor() {
        this.library = [];
    }

    addBook(title, author, pages) {
        const book = new Book(title, author, pages);
        this.library.push(book);
        return book;
    }

    getBook(bookID) {
        return this.library.find(book => book.getBookID() === bookID);
    }

    removeBook(bookID) {
        this.library = this.library.filter(book => book.id !== bookID);
    }

    getLibrary() {
        return this.library;
    }
}

class LibraryApp {
    #readShelf = document.querySelector(".read-shelf");
    #unreadShelf = document.querySelector(".shelf");
    #dialog = document.querySelector("dialog");
    #form = document.querySelector("form");
    #title = document.getElementById("book-title");
    #titleError = document.getElementById("title-error");

    #author = document.getElementById("book-author");
    #authorError = document.getElementById("author-error");

    #pages = document.getElementById("book-pages");
    #pageError = document.getElementById("page-error");

    #cancel = document.querySelector(".cancel");
    #newBook = document.querySelector(".new");
    #card = document.querySelector(".card");
    #formCheckBox = this.#form.querySelector(".is-read");

    constructor(library) {
        this.library = library;
    }

    init() {
        this.#displayBooks(this.library.getLibrary());
        this.#newBook.addEventListener("click", () => { this.#dialog.showModal(); });
        this.#cancel.addEventListener("click", () => { this.#resetForm(); });

        this.#form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!this.#title.validity.valid) {
                this.#showTitleError();
            }

            if (!this.#author.validity.valid) {
                this.#showAuthorError();
            }

            if (!this.#pages.validity.valid) {
                this.#showPageError();
            }

            if (this.#form.checkValidity()) {
                this.#addBook();
            }
        });

        this.#title.addEventListener("input", () => {
            if (this.#title.validity.valid) {
                this.#titleError.textContent = "";
                this.#titleError.className = "error";
            } else {
                this.#showTitleError();
            }
        });

        this.#author.addEventListener("input", () => {
            if (this.#author.validity.valid) {
                this.#authorError.textContent = "";
                this.#authorError.className = "error";
            } else {
                this.#showAuthorError();
            }
        });

        this.#pages.addEventListener("input", () => {
            if (this.#pages.validity.valid) {
                this.#pageError.textContent = "";
                this.#pageError.className = "error";
            } else {
                this.#showPageError();
            }
        });
    }

    #addBook() {
        const bookTitle = this.#title.value;
        const bookAuthor = this.#author.value;
        const bookPages = this.#pages.value;
        const book = this.library.addBook(bookTitle, bookAuthor, bookPages);
        this.#formReadStatus(book);
        this.#renderBook(book);
        this.#resetForm();
    }

    #resetForm() {
        this.#form.reset();
        this.#titleError.textContent = "";
        this.#titleError.className = "error";
        this.#authorError.textContent = "";
        this.#authorError.className = "error";
        this.#pageError.textContent = "";
        this.#pageError.className = "error";
        this.#dialog.close();
    }

    #showTitleError() {
        if (this.#title.validity.valueMissing) {
            this.#titleError.textContent = "The book name must be filled!";
        }
        this.#titleError.className = "error active";
    }

    #showAuthorError() {
        if (this.#author.validity.valueMissing) {
            this.#authorError.textContent = "The author name must be filled!";
        }
        this.#authorError.className = "error active";
    }
    
    #showPageError() {
        if (this.#pages.validity.valueMissing) {
            this.#pageError.textContent = "Please enter pages!";
        } else if (Number.isNaN(this.#pages.value)) {
            this.#pageError.textContent = "Please enter a number!";
        }
        else if (this.#pages.validity.rangeUnderflow) {
            this.#pageError.textContent = "A book cannot have 0 or less pages!";
        }
        this.#pageError.className = "error active";
    }

    #formReadStatus(book) {
        if (this.#formCheckBox.checked) { book.toggleReadStatus(); }
    }

    #renderBook(book) {
        const clone = this.#card.cloneNode(true);
        clone.style.visibility = "visible";
        clone.classList.add("book");
        clone.querySelector(".title").textContent = book.getTitle();
        clone.querySelector(".author").textContent = book.getAuthor();
        clone.querySelector(".pages").textContent = `${book.getPages()} pages`;
        clone.dataset.bookId = book.getBookID();

        if (book.isRead()) {
            this.#readShelf.appendChild(clone);
            clone.querySelector(".read-status").checked = true;
        } else {
            this.#unreadShelf.appendChild(clone);
        }

        this.#removeBook(clone);
        this.#moveBook(clone, book);
    }

    #removeBook(card) {
        const deleteBtn = card.querySelector(".delete");
        const bookID = card.dataset.bookId;
        deleteBtn.addEventListener("click", () => {
            this.library.removeBook(bookID);
            if (this.#unreadShelf.contains(card)) {
                this.#unreadShelf.removeChild(card);
            } else {
                this.#readShelf.removeChild(card);
            }
        });
    }

    #moveBook(card, book) {
        const checkBox = card.querySelector(".read-status");
        checkBox.addEventListener("change", () => {
            book.toggleReadStatus();
            if (book.isRead()) {
                this.#readShelf.appendChild(card);
            } else {
                this.#unreadShelf.appendChild(card);
            }
        });
    }

    #displayBooks(books) {
        this.library.getLibrary().forEach(book => this.#renderBook(book));
    }
}

const library = new Library();
library.addBook("A Handmaid's Tale", "Margaret Atwood", 420);
library.addBook("A Little Life", "Hanya Yanagihara", 736);
const libraryApp = new LibraryApp(library);
libraryApp.init();