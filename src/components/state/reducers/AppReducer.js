// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS

import { OrdersReducer } from './OrdersReducer';


// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    orders: OrdersReducer
});
