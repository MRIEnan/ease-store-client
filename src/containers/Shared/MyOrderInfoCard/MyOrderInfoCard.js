import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyOrderInfoCard.css';

const MyOrderInfoCard = (props) => {
    const navigate = useNavigate();
    const {ordererName, productId, _id} = props.order;
    console.log(ordererName)
    console.log(props.setIsDeleted)
    const [product,setProduct]=useState({});
    useEffect(()=>{
        fetch(`https://stormy-wildwood-71452.herokuapp.com/product/${productId}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[]);

    const handleCancelBtn = () => {
        console.log('cancel btn clicked')
        const ans = window.confirm('Do you really want to cancel the order?')
        if(ans){
            fetch(`https://stormy-wildwood-71452.herokuapp.com/orders`,{
                method:'DELETE',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({id:_id})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            });
            window.alert('order canceled successfully')
            navigate('/dashboard/profile');
        }
    }
    console.log(product)
    return (
        <div className="my-order-info-card">
            <h2>{product?.title?.slice(0,10)}</h2>
            <p>${product.price}</p>
            <p>{ordererName}</p>
            <button onClick={handleCancelBtn}>Cancel</button>
        </div>
    );
};

export default MyOrderInfoCard;