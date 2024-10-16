import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "../assets/css/header.css"



const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);  // Toggle menu open/close
    };


// Effect to handle scroll disabling
useEffect(() => {
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
        document.body.style.overflow = 'auto'; // Enable scroll
    }

    // Cleanup function to reset overflow when the component unmounts or when menu is closed
    return () => {
        document.body.style.overflow = 'auto'; // Reset to auto on unmount
    };
}, [isMenuOpen]);


  return (
    <header className="header">
            <div className='d-flex '>
                <h1 className="title">
                    <Link to="/">Shadong</Link>  {/* Link to home page */}
                </h1>
                <div className='header-links'>
                    <a className='login'><Link to="/">Log In</Link></a>
                    <a className='register'><Link to="/">Create Account</Link></a>
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
                    <li><a href="/">My Shelf</a></li>
                    <li><a href="/">Account</a></li>
                    <li><a href="/">About Shadong</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </div>
        </header>
  );
};

export default Header;
