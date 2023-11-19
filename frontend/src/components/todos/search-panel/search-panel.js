import React from 'react';
import './search-panel.css';

const SearchPanel = ({ search, onLabelSearch }) => {
    return(
        <input type="text" className="form-control search-panel" placeholder='Search' value={search} onChange={(e)=>onLabelSearch(e.target.value)}/>
    )
}

export default SearchPanel;