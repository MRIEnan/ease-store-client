import React, { useState, useEffect } from 'react';
import './HomeNavbar.css';
import { NavHashLink } from 'react-router-hash-link';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const HomeNavbar = () => {
    const { user, logOut } = useAuth();
    const [menuDist,setMenuDist] = useState(0);
    const [width,setWidth] = useState(window.innerWidth);
    const [isOpen,setIsOpen] = useState(true);

    const functionResize= () =>{
        let windowWidth = window.innerWidth;
        if(windowWidth>667){
            if(width>667){
                return
            }
            else{
                setWidth(windowWidth)
            }
        }
        else{
            if(width<667){
                return
            }
            else{
                setWidth(windowWidth)
            }
        }
    }
    window.onresize = ()=>functionResize();

    useEffect(() => {
        const menuBtn = document.getElementById('menu-toggle-btn');
        const menu= document.getElementById('menu-holder');
        if(width<667){
            console.log('toggle');
            menuBtn.style.display="block";
            menu.style.display="none";
            menu.classList.add('home-navbar-toggle-container')
            menu.classList.remove('home-navbar-open-container')
        }
        else{
            setIsOpen(true)
            console.log('no')
            menuBtn.style.display="none";
            menu.style.display='flex';
            menu.classList.add('home-navbar-open-container')
            menu.classList.remove('home-navbar-toggle-container')
        }
    },[width]);
    
    
    
    const handleOnClick = () =>{
        const menu= document.getElementById('menu-holder');
        setIsOpen(!isOpen);
        if(isOpen){
            menu.style.display='block';
        }
        else{
            menu.style.display='none';
        }
    }

    const handleNavClick = () => {
        if(width>667){
            return
        }
        const menu= document.getElementById('menu-holder');
        menu.style.display='none';
        setIsOpen(true);
    }

    
    return (
        <div className="home-navbar-main-container">
            <div>
                <div className="menu-toggle-btn-container">
                    <button id="menu-toggle-btn" onClick={handleOnClick}>
                    {isOpen?<FontAwesomeIcon  icon={faBars} />:<FontAwesomeIcon  icon={faTimes} />}
                </button>
                </div>
            </div>
            <div id="menu-holder" className="home-navbar-open-container home-navbar-toggle-container">
                <span className="home-navbar-user-displayName">
                    {user.displayName &&
                        <h2 className="home-navbar-user-name">{user.displayName}</h2>
                    }
                </span>
                <ul>
                    <li>
                        <NavHashLink onClick={handleNavClick} to="/home">Home</NavHashLink>
                    </li>
                    {user.email && <li>
                        <NavHashLink onClick={handleNavClick} to="/dashboard">Dashboard</NavHashLink>
                    </li>}
                    {user.email && <li>
                        <NavHashLink onClick={handleNavClick} to="/products">AllProducts</NavHashLink>    
                    </li>}
                    {!user.email ?<li>
                        <NavHashLink onClick={handleNavClick} to="/login">Login</NavHashLink>
                    </li>:
                    <li>
                        <button onClick={logOut}>Log Out</button>
                    </li>}
                </ul>
            </div>
        </div>
    );
};

export default HomeNavbar;