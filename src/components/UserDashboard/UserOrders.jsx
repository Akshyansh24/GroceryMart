import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../../utils/context';



function UserOrders(orders) {
    // const{auth} = useContext(Context);

    // const [orders, setOrders] = useState([]);
    // const getOrders = async() =>{
    //   try {
    //     const {data} = await axios.get(`${process.env.REACT_APP_API}/api/auth/orders`)
    //     setOrders(data.orders);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  
    // useEffect(() => {
    //   getOrders();
    // }, [])

    console.log(orders.orders);


  return (
    <>
        {orders.orders.map((o,i)=>(
            <tr key={o._id}>
                <td>{i+1}</td>
                <td>{o.products.name}</td>
                <td>{o.products.name}</td>
                <td>{o.buyer.name}</td>
                <td>{o.products.length}</td>
                <td>{o.payment.transaction.amount}</td>
                <td>{o.payment.success ? "Success" : "Failed"}</td>
                <td>{o.status}</td>
                <td></td>
            </tr>
        ))}
    </>
  )
}

export default UserOrders