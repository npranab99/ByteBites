import { useState,React, useEffect } from "react";

const SearchBar = () => {
    const[searchItem, setSearchItem] = useState('');

    const handleSearchBox = (e) => {
        setSearchItem(e.target.value);
    }

    const handleSearch = () => {
        console.log(searchItem);
        
    }

    return (
        <div>
            <input type='text' placeholder='Search For Restruents and Foods' value={searchItem} onChange={handleSearchBox}/>
            <button className='search-btn' onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
