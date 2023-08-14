import {React, useContext, useState} from 'react'
import "./Login.css"
import { toast } from 'react-toastify';
import {useNavigate , useLocation} from "react-router-dom"
import axios from "axios";
import { Context } from '../../utils/context';
function Login() {

  const {auth, setAuth} = useContext(Context);
  const navigate  = useNavigate();
  const location = useLocation();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async(event) =>{
      event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {email,password});          
            if(res.data.success){
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token,
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                toast.success(res.data.message);
                navigate(location.state ||'/ ');

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
                        <input className='form-control mb-3' type="email" value={email} name="email" placeholder='Email' onChange={(event)=> setEmail(event.target.value)}  required/>
                        <input className='form-control mb-3' type="password" value={password} name="password" placeholder='Password' onChange={(event)=> setPassword(event.target.value)}  required/>
                        <input className='btn btn-primary' type="submit" value="Submit" />
                    </form>
                    <button className='btn btn-primary mt-2' onClick={()=>{
                      navigate('/forgetpassword')
                    }}>Forget Password</button>
                    </div>
                   </div>
            </div>
        </div>
    </div>
  )
}

export default Login