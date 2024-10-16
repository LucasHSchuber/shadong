import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "../assets/css/header.css"



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);  
    };


// Effect to handle scroll disabling
useEffect(() => {
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden'; 
    } else {
        document.body.style.overflow = 'auto'; 
    }

    // Cleanup function to reset overflow when the component unmounts or when menu is closed
    return () => {
        document.body.style.overflow = 'auto'; 
    };
}, [isMenuOpen]);


  return (
    <header className="header">
            <div className='d-flex '>
                <h1 className="title">
                    <Link to="/">Shadong</Link>  
                </h1>
                <div className='header-links'>
                    <a className='login'><Link to="/login">Log In</Link></a>
                    <a className='register'><Link to="/register">Create Account</Link></a>
                </div>
            </div>
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            {/* Dropdown Menu */}
            <div className={`dropdown-menu ${isMenuOpen ? 'visible' : 'hidden'}`}>
                <ul>
                    <li><Link to="/myshelf">My Shelf</Link></li>
                    <li><Link to="/myshelf">Account</Link></li>
                    <li><Link to="/myshelf">About Shadong</Link></li>
                    <li><Link to="/myshelf">Logout</Link></li>
                </ul>
            </div>
        </header>
  );
};

export default Header;
