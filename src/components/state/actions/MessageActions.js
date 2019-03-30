// ACTION NAMES

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const CLEAR_ALL = 'CLEAR_ALL';


// ACTION GENERATORS

export const addMessage = (content, status) => ({
    type: ADD_MESSAGE,
    content,
    status
});

export const removeMessage = (id) => ({
    type: REMOVE_MESSAGE,
    id
});



