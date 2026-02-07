const library = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  library.push(book);
}

// Maybe add a delete card in here to the button via event listener
const createCard = (book) => {
    card = document.querySelector(".card").cloneNode(true);
    card.style.visibility = "visible";
    card.querySelector(".title").textContent = book.title;
    card.querySelector(".author").textContent = book.author;
    card.querySelector(".pages").textContent = book.pages;
    card.querySelector(".status").textContent = book.read;
    card.dataset.bookId = book.id;
    return card;
}

const page = document.querySelector(".shelf");

const displayBooks = () => {
    page.innerHTML = '';
    for (const book of library) {
        page.appendChild(createCard(book));
    }

    // add event listeners to buttons now
    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach(btn => removeCard(btn));
}

const removeCard = (btn) => {
    btn.addEventListener("click", () => {
        for (const book of library) {
            if (btn.parentElement.dataset.bookId === book.id) {
                removeBook(book);
                page.removeChild(btn.parentElement);
            }
        }
    })
}

const removeBook = (book) => {
    const index = library.indexOf(book);
    library.splice(index, 1);
}

const dialog = document.querySelector("dialog");
const addBtn = document.querySelector(".new");

addBtn.addEventListener("click", () => {
    dialog.showModal();
});

const submit = document.querySelector(".add");
const cancel = document.querySelector(".cancel");
const form = document.querySelector("form");

submit.addEventListener("click", (e) => {
    const title = document.querySelector(".book-title").value;
    const author = document.querySelector(".book-author").value;
    const pages = document.querySelector(".book-pages").value;
    e.preventDefault();
    if (form.checkValidity()) {
        addBookToLibrary(title, author, pages);
        displayBooks();
        dialog.close();
        form.reset();
    } else {
        form.reportValidity();
    }
});

cancel.addEventListener("click", () => {
    dialog.close();
});

addBookToLibrary("Hello", "John", 123);
addBookToLibrary("Goodbye", "Jane", 456);
displayBooks();