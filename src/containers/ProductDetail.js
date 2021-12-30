import React, {useEffect} from 'react';
import './ProductDetail.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/productActions';
import HomeNavbar from './HomeNavbar/HomeNavbar';

const ProductDetail = () => {
    const product = useSelector((state) => state.product)
    const { image, title, price, category, description} = product;
    const {productId} = useParams();
    const dispatch = useDispatch()
    console.log(productId);

    const fetchProductDetail = async() => {
        const response = await axios.get(`https://stormy-wildwood-71452.herokuapp.com/${productId}`).catch(err => {
            console.log('Err',err)
        })

        dispatch(selectedProduct(response.data));
    }
    useEffect(()=>{
        if(productId && productId !== ""){
            fetchProductDetail();
        }
        return() =>{
            dispatch(removeSelectedProduct())
        }
    },[productId]);

    return (
        <div className=''>
            {Object.keys(product).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <>
                <HomeNavbar/>
                <div className="product-detail-main-container">
                    <div className="product-detail-content-container">
                        <div className="product-detail-image-container">
                            <img src={image} alt="" className="" />
                        </div>
                        <div className="">
                            <h1 className="product-detail-title">{title}</h1>
                            <p className="product-detail-price">${price}</p>
                            <h3 className="product-detail-category">{category}</h3>
                            <p className="product-detail-description">{description}</p>
                            <div className="" tabIndex="0">
                                <button className='btn-special'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default ProductDetail;
    /* return (
        <div className='ui grid container'>
            {Object.keys(product).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="ui placeholder segment">
                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">AND</div>
                        <div className="middle aligned row">
                            <div className="middle aligned row">
                                <div className="column rp">
                                    <img src={image} alt="" className="ui fluid image" />
                                </div>
                                <div className="column rp">
                                    <h1>{title}</h1>
                                    <h2>
                                        <p className='ui teal tag label'>${price}</p>
                                    </h2>
                                    <h3 className='ui brown block header'>{category}</h3>
                                    <p>{description}</p>
                                    <div className="ui vertical animated button" tabIndex="0">
                                        <div className="hidden content">
                                            <i className="shop icon"></i>
                                        </div>
                                        <div className="visible content">Add to Cart</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail; */