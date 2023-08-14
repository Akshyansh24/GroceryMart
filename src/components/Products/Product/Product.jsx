import {React, useContext, useState} from 'react'
import "./Product.css"
import {useNavigate, useLocation} from "react-router-dom"
import { Context } from '../../../utils/context';

function Product({ defaultimg , hoverimg, Pcategory, name , vendorName, price, pid ,  editclick, handleDeleteProduct, }) {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='col-md-3'>
        <div className="product-card mt-3">
          {location.pathname == "/dashboard/admin" && <span className='delete-badge' onClick={()=>{ handleDeleteProduct(pid)}}><i className="fa-solid fa-trash"></i></span>}
          {location.pathname == "/dashboard/admin" ? <span className='edit-badge' onClick={()=>{editclick(pid)}} >Edit</span> : <span className='badge'>Hot</span> }
          
          <div className="product-img position-relative">
              <img src={defaultimg} alt="" />
              <img src={hoverimg} alt="" />
          </div>
          <div className="product-content">
              <div className="product-category">
                <p>{Pcategory.name}</p>
              </div>
              <h2 >{name}</h2>
              <span className='font-small text-muted'>By {vendorName}</span>
          </div>
          <div className="product-bottom mt-2">
            <div className="product-price">
              <span>&#8377; {price}</span>
              {/* {!setshowOldprice ? <span className='old-price'>$32.8</span> : ""} */}
            </div>
            <div className="view-product">
              <button onClick={()=>{
                navigate(`/product/${pid}`)
              }}> <i className="fa-solid fa-eye"></i> View</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Product