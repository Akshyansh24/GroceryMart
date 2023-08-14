import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import axios from "axios";


function Register() {

    const navigate  = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async(event) =>{
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {name,email,password,phone,address});
            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);

            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }
 
    }


    return (
        <div>
            <div className="col-md-12 mt-4 mb-4 d-flex justify-content-center">
                <div className="login-content">
                       <div className="card">
                        <div className="card-body">
                        <form onSubmit={handleSubmit} method="post">
                            <input className='form-control mb-3' type="name" value={name} name="email" placeholder='Name'  onChange={(event)=> setName(event.target.value)} required />
                            <input className='form-control mb-3' type="email" value={email} name="email" placeholder='Email' onChange={(event)=> setEmail(event.target.value)}  required/>
                            <input className='form-control mb-3' type="number" value={phone} name="phone" placeholder='Phone'  onChange={(event)=> setPhone(event.target.value)} required/>
                            <input className='form-control mb-3' type="text" value={address} name="address" placeholder='Address' onChange={(event)=> setAddress(event.target.value)} required/>
                            <input className='form-control mb-3' type="password" value={password} name="password" placeholder='Password' onChange={(event)=> setPassword(event.target.value)}  required/>
                            <input type="submit" value="Submit" />
                        </form>
                        </div>
                       </div>
                </div>
            </div>
        </div>
      )
}

export default Register