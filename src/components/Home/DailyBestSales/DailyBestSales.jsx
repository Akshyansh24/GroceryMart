import {React, useContext, useEffect} from "react";
import "./DailyBestSales.css";
import Carousel from "react-bootstrap/Carousel";
import Products from "../../Products/Products";
import Product from "../../Products/Product/Product";
import { Context } from "../../../utils/context";
function DailyBestSales() {

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
              <h3>Popular Products</h3>
            </div>
          </div>
          <div className="col-md-8 justify-content-end d-flex">
            <ul className="mannul-tabs">
              <li>All</li>
              <li>Milk & Dairy</li>
              <li>Coffee & Tea's</li>
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
                <Products  />
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <Products  />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyBestSales;
