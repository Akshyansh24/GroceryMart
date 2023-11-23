import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import axios from "axios";


function Register({setShowRegister}) {

    const navigate  = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [answer,setAnswer] = useState('');
    const [role,setRole] = useState(0);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {name,email,password,phone,answer,role});
            if(res.data.success){
                toast.success(res.data.message);
                setShowRegister(false)
            }else{
                toast.error(res.data.message);

            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }
 
    }


    return (
        // <div>
        //     <div className="col-md-12 mt-4 mb-4 d-flex justify-content-center">
        //         <div className="login-content">
        //                <div className="card">
        //                 <div className="card-body">
        //                 <form onSubmit={handleSubmit} method="post">
        //                     <input className='form-control mb-3' type="name" value={name} name="email" placeholder='Name'  onChange={(event)=> setName(event.target.value)} required />
        //                     <input className='form-control mb-3' type="email" value={email} name="email" placeholder='Email' onChange={(event)=> setEmail(event.target.value)}  required/>
        //                     <input className='form-control mb-3' type="number" value={phone} name="phone" placeholder='Phone'  onChange={(event)=> setPhone(event.target.value)} required/>
        //                     <input className='form-control mb-3' type="text" value={address} name="address" placeholder='Address' onChange={(event)=> setAddress(event.target.value)} required/>
        //                     <input className='form-control mb-3' type="password" value={password} name="password" placeholder='Password' onChange={(event)=> setPassword(event.target.value)}  required/>
        //                     <input type="submit" value="Submit" />
        //                 </form>
        //                 </div>
        //                </div>
        //         </div>
        //     </div>
        // </div>


        <>
        <form onSubmit={handleSubmit} action="">
        <input className='mt-3' type="name" value={name} name="name" placeholder='Enter your name'  onChange={(event)=> setName(event.target.value)} required />
        <input className='mt-3' type="email" value={email} name="email" placeholder='Enter your email' onChange={(event)=> setEmail(event.target.value)}  required/>
        <input className='mt-3' type="number" value={phone} name="phone" placeholder='Enter your mobile number'  onChange={(event)=> setPhone(event.target.value)} required/>
        <input className='mt-3' type="text" value={answer} name="answer" placeholder='What is your favorite Sports' onChange={(event)=> setAnswer(event.target.value)}  required/>
        <select className='mt-3' name="role" id="" value={role} onChange={(event)=> setRole(event.target.value)}>
            <option value="1">Vendor</option>
            <option value="2">Customer</option>
        </select>
        <input className='mt-3' type="password" value={password} name="password" placeholder='Enter your password' onChange={(event)=> setPassword(event.target.value)}  required/>
          <input className=" submit-btn mt-3" type="submit" value="Sign Up" />
        </form>
        <div className="register-area">
          <p>Already have an account</p>
          <span className="register-area-span" onClick={()=>{setShowRegister(false)}}>Sign In</span>
        </div>
      </>
      )
}

export default Register