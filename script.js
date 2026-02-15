/*const page = document.querySelector(".shelf");
const readShelf = document.querySelector(".read-shelf");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".new");
const submit = document.querySelector(".add");
const cancel = document.querySelector(".cancel");
const form = document.querySelector("form");
const checkBox = document.querySelector(".is-read");
let isChecked = false;*/

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
}

class LibraryApp {
    #readShelf = document.querySelector(".read-shelf");
    #unreadShelf = document.querySelector(".shelf");
    #checkBox = document.querySelector(".is-read");

    constructor(library) {
        this.library = library;
    }

    moveBook(bookID) {
        this.#checkBox.addEventListener("change", () => {
            const book = this.library.getBook(bookID);
            const card = document.querySelector(`[data-book-id="${book.getBookID()}"]`);
            book.toggleReadStatus();
            if (book.isRead()) {
                this.#readShelf.appendChild(card);
            } else {
                this.#unreadShelf.appendChild(card);
            }
        });
    }
}
/*
const createCard = (book) => {
    card = document.querySelector(".card").cloneNode(true);
    card.style.visibility = "visible";
    card.classList.add("book");
    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author").textContent = book.author;
    card.querySelector(".pages").textContent = book.pages + " pages";
    card.dataset.bookId = book.id;

    if (isChecked) {
        book.isRead();
        card.querySelector(".read-status").checked = true;
    }
    return card;
}

const displayBook = (book) => {
    const card = createCard(book);
    if (card.querySelector(".read-status").checked) {
        readShelf.appendChild(card);
    } else {
        page.appendChild(card);
    }

    // Must query all buttons at every new addition, in order not to leave anything out
    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach(btn => removeCard(btn));

    const statusBtns = document.querySelectorAll(".read-status");
    statusBtns.forEach(box => moveBook(box, book));
}

const removeCard = (btn) => {
    btn.addEventListener("click", () => {
        for (const book of library) {
            if (btn.parentElement.parentElement.dataset.bookId === book.id) {
                removeBook(book);
                if (page.contains(btn.parentElement.parentElement)) {
                    page.removeChild(btn.parentElement.parentElement);
                } else {
                    readShelf.removeChild(btn.parentElement.parentElement);
                }
            }
        }
    });
}

const removeBook = (book) => {
    const index = library.indexOf(book);
    library.splice(index, 1);
}

addBtn.addEventListener("click", () => {
    dialog.showModal();
});

submit.addEventListener("click", (e) => {
    const title = dialog.querySelector(".book-title").value;
    const author = dialog.querySelector(".book-author").value;
    const pages = dialog.querySelector(".book-pages").value;
    e.preventDefault();
    if (form.checkValidity()) {
        const book = addBookToLibrary(title, author, pages);
        isChecked = checkBox.checked;
        displayBook(book);
        dialog.close();
        form.reset();
    } else {
        form.reportValidity();
    }
});

cancel.addEventListener("click", () => {
    dialog.close();
});

const book1 = addBookToLibrary("A Handmaid's Tale", "Margaret Atwood", 420);
const book2 = addBookToLibrary("A Little Life", "Hanya Yanagihara", 736);
library.forEach(book => displayBook(book));
*/