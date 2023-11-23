import {React, useContext, useEffect, useState} from "react";
import "./DailyBestSales.css";
import Carousel from "react-bootstrap/Carousel";
import Products from "../../Products/Products";
import Product from "../../Products/Product/Product";
import { Context } from "../../../utils/context";
function DailyBestSales() {
  const {categories, discountProducts} = useContext(Context);
  // const categoryid = "1";
  // const {showOldprice , setshowOldprice} = useContext(Context);
  // useEffect(() => {
  //   if(categoryid == ""){
  //     setshowOldprice(false);
  //     console.log("empty");
  //   } else  {
  //     setshowOldprice(false);
  //     console.log("nonempty");
      
  //   }
  // }, [])
  

  
  return (
    <div>
      <div className="Section-box">
        <div className="row">
          <div className="col-md-4">
            <div className="section-title">
              <h3>Best Discount</h3>
            </div>
          </div>
          <div className="col-md-8 justify-content-end d-none">
            <ul className="mannul-tabs">
           
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mt-3">
            <div className="daily-banner">
              <div className="daily-banner-text">
                <h2>Bring nature into your home</h2>
              </div>
              <button className="btn btn-shop">
            Shop Now <i className="fa-solid fa-arrow-right"></i>
          </button>
            </div>
          </div>
          <div className="col-md-9">
            <Carousel>
              <Carousel.Item interval={1000}>
                <div className="row">
                {discountProducts?.map((p)=>(
                <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-mainphoto/${p._id}`} hoverimg={`${process.env.REACT_APP_API}/api/products/product-hoverphoto/${p._id}`} price={p.price} 
                 pid={p._id} discount={p.discount}  Pcategory={p.category} salername={p.salername}/>
                ))}
                </div>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
              <div className="row">
                {discountProducts?.map((p)=>(
                <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-mainphoto/${p._id}`} hoverimg={`${process.env.REACT_APP_API}/api/products/product-hoverphoto/${p._id}`} price={p.price} 
                 pid={p._id} discount={p.discount}  Pcategory={p.category} salername={p.salername}/>
                ))}
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyBestSales;
