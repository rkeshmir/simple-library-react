import {
    ADD_BOOK,
    REMOVE_BOOK,
    ORDER
} from '../actions/OrdersActions';


// INITIALIZE STATE

const initialState = {
    books: []
};


// REDUCER

export const OrdersReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_BOOK:{
            const books = [].concat(state.books);
            const {book} = action;
            book.ordered = false;
            books.push(action.book);
            return {
                ...state,
                books
            };
        }
        case REMOVE_BOOK:{
            const books = [].concat(state.books);
            const {book} = action;
            if(book.ordered)
                return state;
            const index = books.map(b=>b.id).indexOf(book.id);
            if(index < 0)
                return state;
            books.splice(index, 1);
            return {
                ...state,
                books
            };
        }
        case ORDER: {
            const books = state.books.map(book=>Object.assign({}, book, {ordered: true}));
            return {
                ...state,
                books
            };
        }
        default:
            return state;
    }
};
