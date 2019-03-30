import {
    ADD_MESSAGE,
    REMOVE_MESSAGE
} from '../actions/MessageActions';


// INITIALIZE STATE

const initialState = {
    messages: []
};

let counter = 0;


// REDUCER

export const MessageReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_MESSAGE:{
            //  TODO: why don't we assign state.message directly?
            const messages = [].concat(state.messages);
            const {content, status} = action;
            messages.push({id: ++counter, content, status});
            return {
                ...state,
                messages
            };
        }
        case REMOVE_MESSAGE:{
            const {id} = action;
            const messages = state.messages.filter(m=>m.id!==id);
            return {
                ...state,
                messages
            };
        }
        default:
            return state;
    }
};
