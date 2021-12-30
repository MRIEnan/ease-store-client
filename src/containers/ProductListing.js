import React, {useEffect,useState} from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import ProductComponent from './ProductComponent';
import { setProducts } from '../redux/actions/productActions';
import HomeNavbar from './HomeNavbar/HomeNavbar';
import HomeBanner from './HomeBanner/HomeBanner';

const ProductListing = () => {
    const products = useSelector( (state) => state)
    const dispatch = useDispatch();

    const fetchProducts = async() => {
        const response = await axios.get('https://stormy-wildwood-71452.herokuapp.com/products').catch((err) => {
            console.log("Err",err)
        })
        dispatch(setProducts(response.data))
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    console.log("products",products);
    return (
        // <div className='ui grid container'>
        <div className=''>
            <HomeNavbar/>
            <HomeBanner/>
            <ProductComponent></ProductComponent>
        </div>
    );
};

export default ProductListing;