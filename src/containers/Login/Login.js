import React, { useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';
import './Login.css';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeNavbar from '../HomeNavbar/HomeNavbar';

const Login = () => {
    const {user,loginUser,authError} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [userInfo,setUserInfo] = useState({})
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleLogin = e =>{
        e.preventDefault();
        console.log('login button clicked');
        console.log(userInfo)
        // setUserInfo({});
        loginUser(email,password,location,navigate)
        e.target.reset();
    }
    
    if(user.email){
        navigate('/home')
    }
    return(
        <>
        <HomeNavbar/>
        <div className="login-main-container">
            <h2 className="heading">Login</h2>
            <div className="login-form-container">
                <form onSubmit={handleLogin} className="login-form">
                    <input type="text" placeholder="Enter your email" name="email" onChange={e=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Enter your password" name="password" onChange={e=>setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </form>
                {authError && <p>{authError}</p>}
                <hr/>
            </div>
            <p style={{margin: '5px auto'}}>Or</p>
            <p className="login-or-register">Have not Registered? Please <NavHashLink className="btn-special" to="/register">Register</NavHashLink></p>
        </div>
        </>
    )
}

export default Login;