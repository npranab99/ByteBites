import React from 'react';
import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';
import routePath from '../utils/routePath';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';

const Header = () => {

    const cartItems = useSelector((store)=>store.cartReducer.items)

    const navigate = useNavigate();

    const handleAbout=()=>{
        navigate(routePath.about)
    }

    const handleHome=()=>{
        navigate(routePath.home)
    }

    const handleContacts=()=>{
        navigate(routePath.home+"/"+"abc")
    }

    const handleLogin =()=>{
        navigate(routePath.login)
    }

    const handleCart = ()=>{
        navigate(routePath.cart)
    }


    return (
        
        <div className='header'>
        <div className='logo-container'>
            <img className='logo' src='https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg'/>
        </div>

        <SearchBar/>
        <div className='nav-items'>
            <ul>
            <li onClick={handleHome}>Home</li>
            <li onClick={handleCart}>Cart - {cartItems.length}</li>
            <li onClick={handleContacts}>Contacts</li>
            <li onClick={handleAbout}>About</li>
            </ul>
        </div>
        </div>
    );
}

export default Header;
 