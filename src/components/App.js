// IMPORT PACKAGES

import React from 'react';
import { Provider } from 'react-redux';

// IMPORT STORE

import { createAppStore } from '../components/state/stores/AppStore';

// IMPORT COMPONENTS

import { AppRouter } from './routers/AppRouter';
import Message from './shared/Message/Message';


// COMPONENT

export const App = () => (
    <Provider store={createAppStore()}>
        <div className="container">
            <AppRouter />
            <Message />
        </div>
    </Provider>
);
