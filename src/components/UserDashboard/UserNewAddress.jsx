import axios from "axios";
import {React, useState, useEffect} from "react";
import { toast } from "react-toastify";
import Addressform from "../Forms/Addressform";


function UserNewAddress({setShowAddAddress, getAddresses, getdefaultaddress}) {
    // For Adding Address
const [name, setName] = useState("");
const [apartment, setApartment] = useState("");
const [area, setArea] = useState("");
const [mobile, setMobile] = useState("");
const [landmark, setLandmark] = useState("")
const [city, setCity] = useState("")
const [state, setState] = useState("")
const[pincode, setPincode] = useState("")
const[defaultaddress, setdefaultaddress] = useState()

const addressFind = async(pincodes) =>{
    if(pincodes.length === 6){
        const options = {
            method: 'GET',
            url: 'https://indian-new-pincode-api.p.rapidapi.com/api/Indian-Pincode-Details/',
            params: {pincode: pincodes},
            headers: {
              'X-RapidAPI-Key': '375d489150mshd7a0f3a695218f9p1d9acejsn40615941ea76',
              'X-RapidAPI-Host': 'indian-new-pincode-api.p.rapidapi.com'
            }
          };
          
          try {
            const response = await axios.request(options);
            // console.log(response.data);
            setState(response.data.state);
            setCity(response.data.town)
          } catch (error) {
            console.error(error);
          }
    }
}


const addingAddress = async (e, ) =>{
 try {
    e.preventDefault();
   const {data} =  await axios.post(`${process.env.REACT_APP_API}/api/auth/store-address`,{
        name,
        mobile, 
        apartment, 
        landmark, 
        area,
        city, 
        state, 
        pincode,
        defaultaddress,
        })
        if(data.success){
            toast.success("Address add successfully")
            setShowAddAddress(false)
            getAddresses();
            getdefaultaddress();
        }else{
            toast.error("Something went Wrong")
        }
 } catch (error) {
    console.log(error);
    toast.error("Something Went Wrong")
 }
}

  return (
    <div className="mt-4">
        <Addressform name={name} setName={setName} apartment={apartment} 
        setApartment={setApartment} area= {area} setArea = {setArea} mobile={mobile} 
        setMobile={setMobile} landmark={landmark} setLandmark={setLandmark} city={city} setCity={setCity}
        state={state} setState={setState} pincode={pincode} setpincode={setPincode} Actionbtn={addingAddress} 
        addressFind={addressFind} defaultaddress={defaultaddress} setdefaultaddress={setdefaultaddress} />
    </div>
  );
}

export default UserNewAddress;
