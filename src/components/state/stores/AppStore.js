// IMPORT PACKAGE REFERENCES

import { createStore, applyMiddleware } from 'redux';

// IMPORT MIDDLEWARE

import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';

// IMPORT REDUCERS

import { AppReducer } from '../reducers/AppReducer';


// CONFIGURE STORE
const middleware = [thunk, promiseMiddleware()];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
export const createAppStore = () => {
    return createStore(AppReducer, composeWithDevTools(applyMiddleware(...middleware)));
};
