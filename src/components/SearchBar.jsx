import { useState,React, useEffect } from "react";
import { useDispatch} from "react-redux";
import { setSearchValues } from "./reducers/searchReducer";

const SearchBar = () => {
    const dispatch = useDispatch();
    const[searchItem, setSearchItem] = useState('');



    const handleSearchBox = (e) => {
        setSearchItem(e.target.value);
    }

    const handleSearch = () => {
        console.log(searchItem);
        dispatch(setSearchValues(searchItem))
        
    }

    return (
        <div>
            <input className="search-box" type='text' placeholder='Search For Restruents and Foods' value={searchItem} onChange={handleSearchBox}/>
            <button className='search-btn' onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
