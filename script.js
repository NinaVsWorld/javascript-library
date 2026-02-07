const library = [];
const page = document.querySelector(".shelf");
const readShelf = document.querySelector(".read");
const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".new");
const submit = document.querySelector(".add");
const cancel = document.querySelector(".cancel");
const form = document.querySelector("form");

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();
}

Book.prototype.isRead = function() {
    if (this.read) {
        this.read = false;
    } else {
        this.read = true;
    }
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  library.push(book);
  return book;
}

const createCard = (book) => {
    card = document.querySelector(".card").cloneNode(true);
    card.style.visibility = "visible";
    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author").textContent = book.author;
    card.querySelector(".pages").textContent = book.pages;
    card.querySelector(".status").textContent = book.read;
    card.dataset.bookId = book.id;
    card.querySelector(".read-status").checked = false;
    return card;
}

const displayBook = (book) => {
    page.appendChild(createCard(book));

    // Must query all buttons at every new addition, in order not to leave anything out
    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach(btn => removeCard(btn));

    const statusBtns = document.querySelectorAll(".read-status");
    statusBtns.forEach(box => moveBook(box, book));
}

const removeCard = (btn) => {
    btn.addEventListener("click", () => {
        for (const book of library) {
            if (btn.parentElement.dataset.bookId === book.id) {
                removeBook(book);
                if (page.contains(btn.parentElement)) {
                    page.removeChild(btn.parentElement);
                } else {
                    readShelf.removeChild(btn.parentElement);
                }
            }
        }
    });
}

const moveBook = (checkBox, book) => {
    checkBox.addEventListener("change", () => {
        if (checkBox.checked) {
            if (!readShelf.contains(checkBox.parentElement)) {
                readShelf.appendChild(checkBox.parentElement);
                book.isRead();
            }
        } else {
            if (!page.contains(checkBox.parentElement)) {
            page.appendChild(checkBox.parentElement);
            book.isRead();
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
    const title = document.querySelector(".book-title").value;
    const author = document.querySelector(".book-author").value;
    const pages = document.querySelector(".book-pages").value;
    e.preventDefault();
    if (form.checkValidity()) {
        const book = addBookToLibrary(title, author, pages);
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