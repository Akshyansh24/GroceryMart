import {React, useState, useContext} from "react";
import "../AdminDashboard/AdminDashboard.css"
import { Context } from "../../utils/context";

function UserMenu() {
    const {showTabs, setShowTabs} = useContext(Context);
    return (
  
        <div className="col-md-3">
          <ul className="list-group">
            <li className= {`list-group-item ${showTabs == 1 ?  "actived" : " " }`}  onClick={()=>{setShowTabs(1)}}>
            <i className="fa-solid fa-sliders"></i> Dashboard
            </li>
            <li className= {`list-group-item ${showTabs == 2 ?  "actived" : " " }`} onClick={()=>{setShowTabs(2)}}>Profile</li>
            <li className= {`list-group-item ${showTabs == 3 ?  "actived" : " " }`} onClick={()=>{setShowTabs(3)}}>Orders</li>
            <li className= {`list-group-item ${showTabs == 5 ?  "actived" : " " }`} onClick={()=>{setShowTabs(5)}}>Logout</li>
          </ul>
        </div>
  
    );
}

export default UserMenu