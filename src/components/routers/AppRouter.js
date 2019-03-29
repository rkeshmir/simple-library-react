// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { Header } from '../Header/Header';
import { HomePage } from '../pages/HomePage';
import ShelvesPage from '../pages/ShelvesPage';
import ShelfPage from '../pages/ShelfPage';


// COMPONENT

export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />            
            <Switch>
                <Route path='/' component={HomePage} exact={true} />
                <Route path='/shelves' component={ShelvesPage} />
                <Route path='/shelf/:title' component={ShelfPage} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);
