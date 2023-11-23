import {React, useContext, useState, useEffect} from 'react'
import "./Product.css"
import {useNavigate, useLocation} from "react-router-dom"
import { Context } from '../../../utils/context';

function Product({ defaultimg , hoverimg, Pcategory, name , price, pid ,  editclick, handleDeleteProduct, salername, discount }) {

  const navigate = useNavigate();
  const location = useLocation();
  
  const[discountBox, setDiscountBox]= useState("")
  
  const showbadge = () =>{
    if(discount >= 10 && discount <= 49){
      setDiscountBox("discount")
    }else if(discount >= 50 && discount <= 60){
      setDiscountBox("new")
    }else if(discount >= 61 && discount <= 79 ){
      setDiscountBox("sale")
    }else if(discount >= 80 && discount <= 99){
      setDiscountBox("hot")
    }
  }

  useEffect(() => {
    showbadge();
    console.log(discountBox);
  }, [])
  

  return (
    <div className='col-md-3'>
        <div className="product-card mt-3">
          {location.pathname == "/dashboard/admin" && <span className='delete-badge' onClick={()=>{ handleDeleteProduct(pid)}}><i className="fa-solid fa-trash"></i></span>}
          {location.pathname == "/dashboard/admin" ? <span className='edit-badge' onClick={()=>{editclick(pid)}} >Edit</span> : 
          
          <span className={`badge ${discountBox === "discount" && "discount"} ${discountBox === "sale" && "sale"} ${discountBox === "hot" && "hot"} ${discountBox === "new" && "new"}`}>
              {discountBox === "discount" && `- ${discount}% off`}
              {discountBox === "sale" && "Sale"}
              {discountBox === "hot" && "Hot"}
              {discountBox === "new" && "New"}
          </span>
          }
          
          <div className="product-img position-relative">
              <img src={defaultimg} alt="" />
              <img src={hoverimg} alt="" />
          </div>
          <div className="product-content">
              <div className="product-category">
                <p>{Pcategory.name}</p>
              </div>
              <h2 >{name}</h2>
              <span className='font-small text-muted' style={{fontWeight:"600"}}>By <span className='text-body-color-green' >{salername}</span></span>
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