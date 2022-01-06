import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import './DashBoardHome.css';

const DashBoardHome = () => {
    return (
        <div>
            <HomeNavbar/>
            <div className='dashboard-home-outlet-container'>
                <div className='dashboardhome-switch'>
                    <NavHashLink to='/dashboard/profile'><button className='btn-special'>Profile</button></NavHashLink>
                    <NavHashLink to='/dashboard/my-orders'><button className='btn-special'>My Orders</button></NavHashLink>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default DashBoardHome;