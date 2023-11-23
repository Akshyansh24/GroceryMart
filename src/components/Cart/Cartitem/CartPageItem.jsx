import React, { useContext } from 'react'
import prod1 from "../../../assets/Products/product-1-1.jpg";
import { Context } from "../../../utils/context";
function CartPageItem() {
    const { cartItem, handleCartProductQuantity, handleRemoveFromCart } =
    useContext(Context);
    console.log(cartItem);
  return (
    <>
    {cartItem.map((p,i)=>(<tr key={p._id} >
        <td>{i+1}</td>
        <td className="product-img">
          <div className="image-thumbnail">
          <img src={`${process.env.REACT_APP_API}/api/products/product-mainPhoto/${p._id}`} alt=""  />
            
          </div>
        </td>
        <td>
          <h6>{p.name}</h6>
        </td>
        <td>
          <h4 className="text-body-color">&#8377;{p.price}</h4>
        </td>
        <td>
        <div className="quantity-buttons">
                  <span onClick={()=>{handleCartProductQuantity("dec", p)}}>-</span>
                  <span>{p.cartQuantity}</span>
                  <span onClick={()=>{handleCartProductQuantity("inc", p)}}>+</span>
                </div>
        </td>
        <td><h4 className="text-body-color-green">&#8377; {p.price * p.cartQuantity}</h4></td>
        <td><i  className="fa-solid fa-trash delete-btn"  onClick={()=>{handleRemoveFromCart(p)}}></i></td>
      </tr>))}</>
  )
}

export default CartPageItem