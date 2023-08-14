import React from "react";
import "./Popularproducts.css";
import Products from "../../Products/Products"

function Popularproducts() {
  return (
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
          <Products/>
      </div>
    </div>
  );
}

export default Popularproducts;
