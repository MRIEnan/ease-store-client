import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './DashBoardMyOrder.css';
import MyOrderInfoCard from '../Shared/MyOrderInfoCard/MyOrderInfoCard';

const DashBoardMyOrder = () => {
    const {user} = useAuth();
    const[myOrders,setMyOrders]=useState([])
    useEffect(()=>{
        fetch(`https://stormy-wildwood-71452.herokuapp.com/my-orders?mail=${user.email}`)
        .then(res => res.json())
        .then(data => {
            setMyOrders(data)
        })
    },[]);
    console.log(myOrders);
    return (
        <div>
            <h2 style={{textAlign:'center'}}>My Orders</h2>
            {
                myOrders.map(order => <MyOrderInfoCard order={order}></MyOrderInfoCard>)
            }
        </div>
    )
};

export default DashBoardMyOrder;