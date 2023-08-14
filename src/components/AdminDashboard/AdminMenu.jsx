import {React, useState, useContext} from "react";
import "./AdminDashboard.css"
import { Context } from "../../utils/context";

function AdminMenu() {
    const {showTabs, setShowTabs} = useContext(Context);
  return (

      <div className="col-md-3">
        <ul className="list-group">
          <li className= {`list-group-item ${showTabs == 1 ?  "actived" : " " }`}  onClick={()=>{setShowTabs(1)}}>
          <i class="fa-solid fa-user"></i> Profile
          </li>
          <li className= {`list-group-item ${showTabs == 2 ?  "actived" : " " }`} onClick={()=>{setShowTabs(2)}}>Create Category</li>
          <li className= {`list-group-item ${showTabs == 3 ?  "actived" : " " }`} onClick={()=>{setShowTabs(3)}}>Create Product</li>
          <li className= {`list-group-item ${showTabs == 4 ?  "actived" : " " }`} onClick={()=>{setShowTabs(3)}}>Users</li>
          <li className= {`list-group-item ${showTabs == 5 ?  "actived" : " " }`} onClick={()=>{setShowTabs(5)}}>Logout</li>
        </ul>
      </div>

  );
}

export default AdminMenu;
