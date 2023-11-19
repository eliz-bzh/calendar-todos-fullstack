import React from 'react';
import './app-header.css';

const AppHeader=({ dateTodos })=>{
    return(
        <div className="app-header d-flex">
            <h1>{dateTodos}</h1>
        </div>
    );
};

export default AppHeader;