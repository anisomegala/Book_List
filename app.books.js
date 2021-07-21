// Book Class: represent books
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class: Hanlde Storage
class UI {
    static displayBooks() {
        const books = Storage.getBooks();

        books.forEach(book => {
            UI.addBook(book);
            
        });


    }
    static addBook(book) {
        const list = document.getElementById("book-list")
        const row = document.createElement("tr")

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger delete btn-sm">Delete</a></td>
        `;
        list.appendChild(row);

    };

    static removeBook(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    };


    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    };

    static showAlertRemoveBook(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.container');
        const table = document.querySelector('#table');
        table.after(div);

        setTimeout(() => document.querySelector('.alert').remove(), 1000
        );
    };


    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }  
}

// Store Class: Hanlde Storage

class Storage {

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
            
        }
        return books;

    }
    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    if(title === '' || author === '' || isbn === '') {
        UI.showAlert("Please, don't leave empty fields!", 'danger' );
    } else {
        const book = new Book(title, author, isbn);
    
        
        
        // add book to list
        UI.addBook(book);

        // store book in localStore
        Storage.addBook(book);

        UI.showAlert('Book added!', 'success');

        UI.clearFields();
    }  
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target);

    // remove book from localStorage
    
    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // /show success message
    UI.showAlertRemoveBook('Book deleted!', 'success');
})