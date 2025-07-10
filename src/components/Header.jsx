import React from 'react';
import '../index.css';
import { useNavigate, useParams } from 'react-router-dom';
import routePath from '../utils/routePath';
const Header = () => {

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

    return (
        
        <div className='header'>
        <div className='logo-container'>
            <img className='logo' src='https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg'/>
        </div>
        <div className='nav-items'>
            <ul>
            <li onClick={handleHome}>Home</li>
            <li onClick={handleAbout}>About</li>
            <li onClick={handleContacts}>Contacts</li>
            <li>Cart</li>
            </ul>
        </div>
        </div>
    );
}

export default Header;
 