import { useState, useEffect, useContext } from "react";
import { Context } from "../../utils/context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
export default function AdminRoute() {
  const { auth, setAuth, showOk, setShowOk } = useContext(Context);


  let data = "";
  let responseData ="";


const authCheck = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/adminauth`)
    console.log(res.data.ok);
    if(res.data.ok){
        setShowOk(true)
    }else{
        setShowOk(false)
    }
}
  useEffect(() => {
    if(auth?.token){       
        authCheck();
    }
  }, [auth?.token]);

  return showOk ? <Outlet/> : <Loader/>

}

