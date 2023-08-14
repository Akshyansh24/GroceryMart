import React, { useContext, useEffect, useState } from 'react'
import "./Cart.css"
import Cartitem from './Cartitem/Cartitem'
import { Context } from '../../utils/context'
import Login from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios';
function Cart({showCart, setShowCart}) {
const {cartItem, auth} = useContext(Context);

const navigate = useNavigate();
const {clientToken, setClientToken} = useState("");
const {instance, setInstance} = useState("")

const totalPrice = ()=>{
  try {
    let total = 0;
    cartItem?.map((product) =>{ total = total + (product.price * product.cartQuantity) })
    return total;
  } catch (error) {
    console.log(error);
  }

}

// Payment
const getToken = async()=>{
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/product/braintree/token`);
    setClientToken(data.clientToken)
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
// getToken()
}, [auth?.token]);

  return (
    <div className='cartpanel'>
        <div className="opac-layer"></div>
        <div className={`cart-content  ${ showCart ? '' :'removeCart' }`}>
            <div className="cart-header">
                  <span className="heading">Shopping Cart</span>
                  <span className="close-btn" onClick={()=>{setShowCart(false)}}>
                  <i className="fa-solid fa-x"></i>
                  </span>
              </div>

              {cartItem.length === 0 ? (
                <div className="empty-cart">
              <i className="fa-solid fa-cart-plus"></i>
              <span>No Product in the cart</span>
                <button onClick={()=>{setShowCart(false)}} className="return-cta">Return To Shop</button>
              </div>
              ) : (
             <>   <Cartitem/>
                <div className="cart-footer">
                <div className="subtotal">
                    <span className="text">Subtotal:</span>
                    <span className="text total">&#8377; {totalPrice()}</span>

                </div>
                <div className="button">
                    {auth.user  ? (<button className="checkout-cta" >Place Order</button>):(<button className="checkout-cta" onClick={()=>{navigate('/login')}} >Login</button>)}
                </div>
            </div></>
              )} 

              {/*  */}
              
             
        </div>
    </div>
  )
}

export default Cart