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
    #submit = document.querySelector(".add");
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
        this.#cancel.addEventListener("click", () => { this.#dialog.close(); });
        this.#submit.addEventListener("click", this.#addBook.bind(this));
    }

    #addBook(e) {
        const title = this.#form.querySelector(".book-title").value;
        const author = this.#form.querySelector(".book-author").value;
        const pages = this.#form.querySelector(".book-pages").value;
        e.preventDefault();
        if (this.#form.checkValidity()) {
            const book = this.library.addBook(title, author, pages);
            this.#formReadStatus(book);
            this.#renderBook(book);
            this.#dialog.close();
            this.#form.reset();
        } else {
            this.#form.reportValidity();
        }
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