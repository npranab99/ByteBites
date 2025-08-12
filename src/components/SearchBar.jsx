import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValues } from "./reducers/searchReducer";

const SearchBar = ({ restaurantList }) => {
    const dispatch = useDispatch();

    // fallback to Redux if prop not passed
    const reduxRestaurantList = useSelector(
        (state) => state.restaurantReducer?.list || []
    );
    const finalList = restaurantList?.length ? restaurantList : reduxRestaurantList;

    const [searchItem, setSearchItem] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchBox = (e) => {
        const rawValue = e.target.value;
        setSearchItem(rawValue);

        const searchValue = rawValue.trim();
        if (searchValue && finalList.length > 0) {
            const filtered = finalList.filter((res) =>
                res.info?.name?.toLowerCase().includes(searchValue.toLowerCase())
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }

        dispatch(setSearchValues(searchValue));
        console.log(suggestions,"sug")
    };

    const handleSearch = () => {
        dispatch(setSearchValues(searchItem.trim()));
        setSuggestions([]);
    };

    const handleSuggestionClick = (name) => {
        setSearchItem(name);
        dispatch(setSearchValues(name));
        setSuggestions([]);
    };

    return (
        <div style={{ position: "relative", width: "300px" }}>
            <input
                className="search-box"
                type="text"
                placeholder="Search For Restaurants and Foods"
                value={searchItem}
                onChange={handleSearchBox}
            />


            {suggestions.length > 0 && (
                <ul style={{
                    position: "absolute",
                    top: "40px",
                    left: 0,
                    background: "white",
                    width: "598px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    listStyle: "none",
                    padding: 0,
                    marginLeft : "4px",
                    zIndex: 100
                }}>
                    {suggestions.map((res) => (
                        <li
                            key={res.info?.id}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                borderBottom: "1px solid #eee"
                            }}
                            onClick={() => handleSuggestionClick(res.info?.name || "")}
                        >
                            {res.info?.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
