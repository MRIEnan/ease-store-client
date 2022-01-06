import React from 'react';
import './HomeBanner.css';

const HomeBanner = ({label}) => {
    return(
        <div className='home-banner-main-container' data-testid="home-banner">
            <div className='home-banner-text-container'>
                <h1 className='home-banner-title'>{label}</h1>
            </div>
        </div>
    )
}

export default HomeBanner;