// ACTION NAMES

export const ADD_BOOK = 'ADD_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';
export const ORDER = 'ORDER';


// ACTION GENERATORS

export const addBook = (book) => ({
    type: ADD_BOOK,
    book
});

export const removeBook = (book) => ({
    type: REMOVE_BOOK,
    book
});

export const order = () => ({
    type: ORDER
});



