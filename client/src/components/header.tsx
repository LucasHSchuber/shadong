import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../components/authContext';

import "../assets/css/header.css"



const Header = () => {
    // define states
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    // const [firstname, setFirstname] = useState<string | null>(null);
    // const [email, setEmail] = useState<string | null>(null);



  
    // useEffect(() => {
    //   const firstname = sessionStorage.getItem("user_firstname");
    //   setFirstname(firstname)
    //   const email = sessionStorage.getItem("user_email");
    //   setEmail(email)
    // }, []);
    


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
                {!isLoggedIn && (
                <div className='header-links'>
                    <a className='login'><Link to="/login">Log In</Link></a>
                    <a className='register'><Link to="/register">Create Account</Link></a>
                </div>
                )}
            </div>
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            {/* Dropdown Menu */}
            <div className={`dropdown-menu ${isMenuOpen ? 'visible' : 'hidden'}`}>
                <ul>
                    {/* {isLoggedIn && (
                        <div className='user-info-box'>
                            <h1>{firstname}</h1>
                            <h1>{email}</h1>
                        </div>
                    )} */}
                    <li><Link to="/">Home</Link></li>   
                    {isLoggedIn && (
                        <>
                            <li><Link to="/myshelf">My Shelf</Link></li>
                            <li><Link to="/">Account</Link></li>
                        </>
                    )}
                    <li><Link to="/about">About Shadong</Link></li>
                    {isLoggedIn && (
                        <li className='mt-4'><Link className='logout-link' to="/" onClick={logout}>Logout</Link></li>
                    )}
                </ul>
            </div>
        </header>
  );
};

export default Header;
