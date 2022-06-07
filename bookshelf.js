// Raamatuklass
class Book {
  constructor(title, author, page, id) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.readpages = readpages;
    
  }
}

//Kasutajaliidese klass
class UI {
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach((book) => UI.addBook(book));
  }

  //Raamatu lisamine

  static addBook(book) {
    document.createElement("td");
    const bookList = document.querySelector("#book-list");
    const row = document.createElement("tr");
    if (book.read === true) {
      row.classList.add("read");
    }

    row.addEventListener("click", function () {
      UI.markAsRead(row);
    });

    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.page}</td>
        <td>${book.readpages}</td>
        <td><i class="fas fa-trash delete"></i></td>
    `;

    bookList.appendChild(row);

    UI.showAlerts("Raamat on edukalt lisatud riiulisse!", "success");
  }

  //Raamatu eemaldamine riiulist

  static deleteBook(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
      Storage.deleteBook(
        target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent
      );
      UI.showAlerts("Raamat on riiulist kustutatud.", "info");
    }
  }

  //Märguanded

  static showAlerts(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector("#container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    const infoalert = document.querySelector(".alert-info") !== null;
    const successalert = document.querySelector(".alert-success") !== null;
    if (infoalert) {
      setTimeout(() => document.querySelector(".alert-info").remove(), 5000);
    }

    if (successalert) {
      setTimeout(() => document.querySelector(".alert-success").remove(), 5000);
    }
  }

  static deleteAlerts() {
    document.querySelectorAll(".alert-danger").forEach((e) => e.remove());
  }

  static clear() {
    document.querySelector("#book-title").value = "";
    document.querySelector("#book-author").value = "";
    document.querySelector("#book-page").value = "";
    document.querySelector("#book-readpages").value = "";
  }
}

class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static deleteBook(title) {
    const books = Storage.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Näitab raamatuid
document.addEventListener("DOMContentLoaded", UI.displayBooks);
document.addEventListener("DOMContentLoaded", UI.showTheme);

// Lisa raamat
document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#book-title").value;
  const author = document.querySelector("#book-author").value;
  const page = document.querySelector("#book-page").value;
  const readpages = document.querySelector("#book-readpages").value;
  

  let error = 0;
  if (title === "" && author === "" && page === "") {
    UI.showAlerts("Täida kõik väljad!", "danger");
    error++;
  } else if (author === "") {
    UI.showAlerts("Sisesta autor!", "danger");
    error++;
  } else if (page === "") {
    UI.showAlerts("Sisesta lehekülgede arv!", "danger");
    error++;
  } else if (title === "") {
    UI.showAlerts("Sisesta pealkiri!", "danger");
    error++;
  } else if (readpages === "") {
    UI.showAlerts("Sisesta loetud lehekülgede arv!", "danger");
    error++;
  } else {
    error = 0;
  }

  if (error === 0) {
    const book = new Book(title, author, page, readpages, false);

    UI.addBook(book);

    Storage.addBook(book);

    UI.clear();

    UI.deleteAlerts();
  }
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});


const cssheet = document.getElementById("csstheme");
counter = 0;
document.querySelector("#checkbox").addEventListener("click", () => {
  counter++;
  UI.changeTheme(counter);
});