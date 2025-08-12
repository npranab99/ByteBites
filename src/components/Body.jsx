import React from 'react';
import ResturantCard from './ResturentCard'
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import ShimmerUI from './ShimmerUI';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
import { setRestaurantList } from './reducers/restaurantReducer';
// import SearchBar from './SearchBar';
// import data from '../utils/mockData';


const Body = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [topRatedButtonFlag, setTopRatedButtonFlag] = useState(false);
    const[searchItem, setSearchItem] = useState('');

    const dispatch = useDispatch();
    
    const  searchedRestro = useSelector((store)=> store.searchReducer.searchValues)
    const restaurantList = useSelector((state) => state.restaurantReducer.list || []);

    useEffect(()=>{
        fetchdata();
    },[])

    useEffect(()=>handleSearch(),[searchedRestro]);

    
    const fetchdata =  async()=>{
        const fetchData = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        const json = await fetchData.json();
        
        console.log(json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        let data = json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setAllData(data);
        setFilteredData(data);
        dispatch(setRestaurantList(data)); //for search bar suggestion
    };
    
    // useEffect(()=>dispatch(setRestaurantList(allData)),[allData]);

    // console.log("body rendered")
    // firstly component will be rendered
    //then useEffect will be called and rendered
    //******//

    const topRatedFilter = () => {
        if (topRatedButtonFlag=== false) {
            const filteredRes = allData.filter((res)=>res.info.avgRating>4.5);
            setTopRatedButtonFlag(true);
            return setFilteredData(filteredRes); 
        }
        const filteredRes = allData;
        setFilteredData(filteredRes);
        return setTopRatedButtonFlag(false);
    }

    // //conditional rendering          //////study///////
    // if(filteredData.length === 0) {
    //     return <ShimmerUI/>
    // }
    
    //search////////////
    
    const handleSearch = () => {
    const searchResDeatils = allData.filter((res)=> res.info.name.toLowerCase().includes(searchedRestro.toLowerCase()));
        if(searchResDeatils.length !== 0) {
            setFilteredData(searchResDeatils);
        }
        else {
            setFilteredData(["No Results Found"]);
        }
    }



    return (
    <div>
        {filteredData.length === 0 ? (
            <ShimmerUI />
        ) : filteredData[0] === "No Results Found" ? (
            <h3>No Results Found</h3>
        ) : (
            <div className='body'>
                <div className='filter-container'>
                    <h3>Filters</h3>
                    <button
                        className='filter-btn'
                        onClick={topRatedFilter}
                    >
                        {topRatedButtonFlag ? "All Restro" : "Top Rated"}
                    </button>
                </div>

                <div className='res-container'>
                    {filteredData.map((restaurant) => (
                        <Link
                            key={restaurant.info.id}
                            to={restaurant.info.id}
                        >
                            <ResturantCard resData={restaurant} />
                        </Link>
                    ))}
                </div>
            </div>
        )}
    </div>
);

}

export default Body;


