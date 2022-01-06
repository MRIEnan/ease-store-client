import React, { useState, useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import HomeNavbar from '../HomeNavbar/HomeNavbar';
import {useNavigate, useParams} from 'react-router-dom';
import './OrderForm.css';

const OrderForm = () => {
    const navigate = useNavigate();
    const {user,setIsLoading,isLoading} = useAuth();
    const [product,setProduct] = useState({});
    const {productId} = useParams();
    const [dateTime,setDateTime] = useState(new Date().toLocaleString());
    console.log(dateTime);
    const [orderInfo,setOrderInfo] = useState({ordererName:user.displayName,ordererEmail:user.email,userEmail:user.email});
    // console.log(productId)
    /* setTimeout(() => {
        setDateTime(new Date().toLocaleString());
    }, 60000); */
    useEffect(() => {
        fetch(`https://stormy-wildwood-71452.herokuapp.com/product/${productId}`)
        .then(res=>res.json())
        .then(data => {
            setProduct(data)
        });
    },[]);
    // console.log('product',product)
    
    const handleSubmit= e => {
        e.preventDefault();
        console.log('order btn clicked');
        orderInfo['dateTime']=dateTime;
        orderInfo['productId']=productId;
        console.log(orderInfo);
        fetch('https://stormy-wildwood-71452.herokuapp.com/order',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                const ans = window.confirm('Order Completed Successfully, Please return to dashboard')
                if(ans){
                    navigate('/dashboard')
                }
                else{
                    navigate('/home')
                }
            }
        })
        console.log('fetched')
    }

    const handleOnBlur=e=>{
        e.preventDefault();
        const fieldName= e.target.name;
        const fieldValue= e.target.value;
        const newOrderInfo=orderInfo;
        newOrderInfo[fieldName]=fieldValue
        setOrderInfo(newOrderInfo);
        console.log(orderInfo);
    }
    if(isLoading){
        return(
            <div style={{textAlign: 'center'}}>loading...</div>
        )
    }
    return (
        <>
        <HomeNavbar/>
        <div className='order-form-main-container'>
            <h3 className='heading'>Please fill the order</h3>
            <div className='order-form-product-card'>
                <div className='order-form-card-image-container'>
                    <img src={`${product.image}`} alt={`${product.title}`} />
                </div>
                <div className='order-form-card-info-container'>
                    <h3>{product?.title?.slice(0,15)}</h3>
                    <h2>$ {product.price}</h2>
                </div>
            </div>
            <form className='order-form-data-container' onSubmit={e=>handleSubmit(e)}>
                <input type='text' onChange={e=>handleOnBlur(e)} name='ordererName' placeholder='Please input your name' defaultValue={user.displayName} required/>
                <input type='email' onChange={e=>handleOnBlur(e)} name='ordererEmail' placeholder='Please insert your mail' defaultValue={user.email} required/>
                <input type='number' onChange={e=>handleOnBlur(e)} name='phone' placeholder='Please insert your number' required/>
                <input type='address' onChange={e=>handleOnBlur(e)} name='address' placeholder='insert your address' required/>
                <input type='text' name='dateTime' value={`${dateTime}`} required/>
                <button className='btn-special' type='submit'>Order</button>
            </form>
        </div>
        </>
    );
};

export default OrderForm;