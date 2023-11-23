import React, { useContext } from 'react'
import { Context } from '../../utils/context';

function VendorMenu() {
    const {showTabs, setShowTabs} = useContext(Context);
    return (
  
        <div className="col-md-3">
          <ul className="list-group">
            <li className= {`list-group-item ${showTabs == 1 ?  "actived" : " " }`}  onClick={()=>{setShowTabs(1)}}>
            <i className="fa-solid fa-user"></i> Profile
            </li>
            <li className= {`list-group-item ${showTabs == 2 ?  "actived" : " " }`} onClick={()=>{setShowTabs(2)}}><i class="fa-solid fa-list"></i>Create Category</li>
            <li className= {`list-group-item ${showTabs == 3 ?  "actived" : " " }`} onClick={()=>{setShowTabs(3)}}><i class="fa-brands fa-product-hunt"></i>Create Product</li>
            <li className= {`list-group-item ${showTabs == 4 ?  "actived" : " " }`} onClick={()=>{setShowTabs(4)}}><i class="fa-solid fa-boxes-stacked"></i>Orders</li>
            <li className= {`list-group-item ${showTabs == 5 ?  "actived" : " " }`} onClick={()=>{setShowTabs(5)}}><i class="fa-solid fa-right-from-bracket"></i>Logout</li>
          </ul>
        </div>
  
    );
}

export default VendorMenu