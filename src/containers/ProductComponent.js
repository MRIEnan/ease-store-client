import React from 'react';
import './ProductComponent.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HomeBanner from './HomeBanner/HomeBanner';

const ProductComponent = () => {
    const products = useSelector( (state) => state.allProducts.products)

    const renderList = products.map(product =>{
        const {_id, title,image,price,category} = product;
        const sortedTitle = title.slice(0,40);
        return(
            <div className='product-card-container' key={_id}>
                <Link to={`/product/${_id}`}>
                <div className="">
                    <div className="">
                        <div className="product-card-image-container"><img src={image} alt={title} /></div>
                        <div className="product-card-info-container">
                            <div className="product-card-title-container">{sortedTitle}</div>
                            <div className="product-card-price-container">$ {price}</div>
                            <div className="product-card-category-container">{category}</div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        );
    })
    

    return (
        <>
            <h2 className='heading'>All Products</h2>
            <div className="product-component-main-container">
                {renderList}
            </div>
        </>
    );
};

export default ProductComponent;
/* const ProductComponent = () => {
    const products = useSelector( (state) => state.allProducts.products)

    const renderList = products.map(product =>{
        const {id, title,image,price,category} = product;
        return(
            <div className='four column wide' key={id}>
                <Link to={`/product/${id}`}>
                <div className="ui link cards">
                    <div className="card">
                        <div className="image"><img src={image} alt={title} /></div>
                        <div className="content">
                            <div className="header">{title}</div>
                            <div className="meta price">$ {price}</div>
                            <div className="meta">{category}</div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        );
    })
    

    return (
        <>
            {renderList}
        </>
    );
};

export default ProductComponent; */