// IMPORT DATA FROM STATIC JSON FILE

import books from './books.json';
import shelves from './shelves.json';

let currentShelves = [].concat(shelves);
let currentBooks = [].concat(books);

// COMPONENT

const simulateError = false;

export const fetchBooks = (shelf) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (!shelf) {
                reject('Shelf should be provided');
            } else {
                resolve(currentBooks.filter(book=>book.shelf === shelf));
            }
        }, 1000);
    });
};
export const searchBook = (query) => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://www.goodreads.com/search/index.xml?key=Mk0S6w7YPzHvy5sUDipOQ&q=' + query;
    return fetch(proxyUrl + targetUrl,
        {
            method: 'GET',
            headers : new Headers ({
                'Accept':'application/xml',
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT',
                'Access-Control-Allow-Headers': 'Content-Type',
            })
        })
        /*.then(blob => console.log(blob),
            e=>console.log(e))*/
        .then(response => {
            console.table(response);
            console.log('response keys',Object.keys(response));
            console.log('response type',typeof response);
            console.log('response text',response);
            return response;
        }, e=>console.log(e));
};
export const addBook = (shelf, book) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (!book || !shelf) {
                reject('Bad input parameters for adding a book to some shelf');
            }
            else if(currentBooks.filter(b=>b.id === book.id).length > 0) {
                reject('Book already exists in the library');
            }
            else {
                book.shelf = shelf;
                currentBooks = currentBooks.concat([book]);
                resolve(currentBooks.filter(book=>book.shelf === shelf));
            }
        }, 1000);
    });
};

export const fetchShelves = () => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (simulateError) {
                reject('Failed to fetch list of zip codes');
            } else {
                resolve(currentShelves);
            }
        }, 1000);
    });
};

export const addShelf = (shelf) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            if (currentShelves.indexOf(shelf) > -1) {
                reject(shelf + ' already exists!');
            } else {
                currentShelves.push(shelf);
                resolve(currentShelves);
            }
        }, 100);
    });
};

export const removeShelf = (shelf) => {
    return new Promise((resolve, reject) => {
        // simulate lengthy service call
        setTimeout(() => {
            for(const book of currentBooks)
                if(book.shelf === shelf) {
                    reject('Non-empty shelf can not be deleted!');
                }
            currentShelves = currentShelves.filter(value=>value!==shelf);
            console.log(currentShelves);
            resolve(currentShelves);

        }, 100);
    });
};


