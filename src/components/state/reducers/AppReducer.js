// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS

import { MessageReducer } from './MessageReducer';


// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    message: MessageReducer
});
