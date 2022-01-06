import React, {useState, useEffect} from 'react';
import './DashBoardProfile.css';
import useAuth from '../../hooks/useAuth';

const DashBoardProfile = () => {
    const {user} = useAuth();
    return (
        <div>
            <div>
                <h2 className='dashboard-profile-user-name'>Name:  {user.displayName}</h2>
                <p className='dashboard-profile-user-email'>Email: {user.email}</p>
            </div>
        </div>
    );
}
export default DashBoardProfile;