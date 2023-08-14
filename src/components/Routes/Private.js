import { useState, useEffect, useContext } from "react";
import { Context } from "../../utils/context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
export default function PrivateRoute() {
  const { auth, setAuth, showOk, setShowOk } = useContext(Context);


  let data = "";
  let responseData ="";



const authCheck = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/userauth`)
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

  console.log(showOk);
  return showOk ? <Outlet/> : <Loader/>

}







// const PrivateRoute=()=>{

//     const {auth, setAuth, showOK, setShowOk} = useContext(Context);

//     const CallApi=async()=>{

//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGI3NzcwNWI0ZWU3MmM0NDhhMjcyMDAiLCJpYXQiOjE2ODk3NDYwMzMsImV4cCI6MTY5MDM1MDgzM30.HW-EfXRh0A6AAaRiJnl7tGIYbpSDrzj0Hq5RK_w0VaU");

//         var raw = "";

//         var requestOptions = {
//           method: 'POST',
//           headers: myHeaders,
//           body: raw,
//           redirect: 'follow'
//         };

//         fetch(`${process.env.REACT_APP_API}/api/auth/userauth`, requestOptions)
//           .then(response => response.text())
//           .then(result => console.log(result))
//           .catch(error => console.log('error', error));
//     }

//     useEffect(async()=>{
//         CallApi()
//     },[])

//     return(
//         <>

//         </>
//     )
// }

// export default PrivateRoute
