import "../VendorDashboard/Vendor.css"
import { React, useContext, useEffect, useState } from "react";
import "../AdminDashboard/AdminDashboard.css";
import { toast } from "react-toastify";
import { Context } from "../../utils/context";
import axios from "axios";
import Categoryform from "../Forms/Categoryform";
import {Modal} from "antd"
import {Select} from "antd"
import Productfrom from "../Forms/Productfrom";
import Product from "../Products/Product/Product";
import Products from "../Products/Products";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import MiniLoader from "../Loader/MiniLoader";
function Vendor() {
  return (
    <div>Vendor</div>
  )
}

export default Vendor