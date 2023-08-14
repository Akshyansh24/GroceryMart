import React, { useContext } from "react";
import "./Cartitem.css";
import prod1 from "../../../assets/Products/Single-product-1.jpg";
import { Context } from "../../../utils/context";

function Cartitem() {
  const { cartItem, handleCartProductQuantity, handleRemoveFromCart } =
    useContext(Context);
  return (
    <div className="cart-products">
      {cartItem.map((p) => (
        <div key={p._id} className="cart-product">
          <div className="img-container">
            <img src={`${process.env.REACT_APP_API}/api/products/product-photo/${p._id}`} alt=""  />
          </div>
          <div className="prod-details">
            <span className="name">{p.name}</span>
            <span className="remove-btn" onClick={()=>{handleRemoveFromCart(p)}}>
              <i className="fa-solid fa-x"></i>
            </span>
            <div className="quantity-buttons">
              <span onClick={()=>{handleCartProductQuantity("dec", p)}}>-</span>
              <span>{p.cartQuantity}</span>
              <span onClick={()=>{handleCartProductQuantity("inc", p)}}>+</span>
            </div>
            <div className="text">
              <span>{p.cartQuantity}</span>
              <span>x</span>
              <span className="highlight">&#8377; {p.price * p.cartQuantity}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cartitem;
