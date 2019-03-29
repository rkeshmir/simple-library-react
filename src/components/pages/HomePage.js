// IMPORT PACKAGE REFERENCES

import React from 'react';

// COMPONENT

const HomePage = () => (
    <main>
        <div className="jumbotron jumbotron-fluid text-dark bg-light animated fadeIn">
            <h1 className="display-6 text-center">Simple Library</h1>
            <p className="lead text-center">
                The most naive virtual library that you can keep track of books in your real library.
            </p>
            <hr className="my-4" />
            <div className="text-center">
                This project has been done to be used in a presentation at Newtec company.
                The presentation topic is explaining React to Angular developers.
            </div>
        </div>
    </main>
);

export { HomePage };
