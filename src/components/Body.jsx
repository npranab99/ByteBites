import React from 'react';
import ResturantCard from './ResturentCard'
import { useState, useEffect } from 'react';
import ShimmerUI from './ShimmerUI';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSelector } from 'react-redux';
// import SearchBar from './SearchBar';
// import data from '../utils/mockData';


const Body = () => {
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [topRatedButtonFlag, setTopRatedButtonFlag] = useState(false);

    useEffect(()=>{
        fetchdata();
    },[])

    const fetchdata =  async()=>{
        const fetchData = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
        const json = await fetchData.json();

        console.log(json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        let data = json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
        setAllData(data);
        setFilteredData(data);
    };

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

    const[searchItem, setSearchItem] = useState('');

    const searchItemStore = useSelector((store)=>store.searchReducer.searchValues)

    console.log(searchItemStore,"printf")
    
    const handleSearchBox = (e) => {
        setSearchItem(e.target.value);
    }
    
    const handleSearch = () => {
    const searchResDeatils = allData.filter((res)=> res.info.name.toLowerCase().includes(searchItem.toLowerCase()));
        if(searchResDeatils.length !== 0) {
            setFilteredData(searchResDeatils);
        }
        else {
            setFilteredData(["No Results Found"]);
        }
    }

    const handleCard = (e)=>{
        console.log(e.target,"element")
    }





    return (filteredData.length === 0) ? (
        <ShimmerUI />
    )
    : (filteredData[0]=== "No Results Found") ? (
        <h3>No Results Found</h3>
    )
    // if data is not fetched yet then show shimmer UI
    :(
        <div>
            <div className='body'>
                <div className='search'>
                    <input type='text' placeholder='Search For Restruents and Foods' value={searchItem} onChange={handleSearchBox}/>
                    <button className='search-btn' onClick={handleSearch}>Search</button>
                </div>
                <div className='filter-container'>
                    <h3>Filters</h3>
                    <button className='filter-btn' onClick={topRatedFilter}>{topRatedButtonFlag ? "All Restra" : "Top Rated"}</button>
                </div>
                <div className='res-container'>
                {filteredData.map((restaurant) => (
                    <Link key={restaurant.info.id} to={restaurant.info.id}><ResturantCard resData={restaurant}/></Link>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Body;


