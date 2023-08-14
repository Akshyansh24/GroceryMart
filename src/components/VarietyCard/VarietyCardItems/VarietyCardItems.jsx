import {React, useEffect} from "react";
import "./VarietyCardItems.css"

function VarietyCardItems({cardimg,title}) {
  return (
    <div>
      <div>
        <div className="variety-card-item">
          <img src={cardimg} alt="" />
          <div className="variety-card-item-text">
            <h4>{title}</h4>
            <button className="btn btn-shop">
            Shop Now <i className="fa-solid fa-arrow-right"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VarietyCardItems;
