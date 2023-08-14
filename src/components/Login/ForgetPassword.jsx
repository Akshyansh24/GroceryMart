import {React, useContext, useState} from 'react'
import { toast } from 'react-toastify';
import {useNavigate } from "react-router-dom"
import axios from "axios";
function ForgetPassword() {
    
  const navigate  = useNavigate();
  
    const [email,setEmail] = useState('');
    const [answer,setAnswer] = useState('');
    const [newpassword,setNewPassword] = useState('');

    const handleSubmit = async(event) =>{
      event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/forget-password`, {email, answer,newpassword});          
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
        <h1 className='text-center'>Forget Password</h1>
     <div className="col-md-12 mt-4 mb-4 d-flex justify-content-center">
     <form onSubmit={handleSubmit} method="post">
        <input
          className="form-control mb-3"
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          type="text"
          value={answer}
          name="answer"
          placeholder="What is your favorite sports ?"
          onChange={(event) => setAnswer(event.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          value={newpassword}
          name="password"
          placeholder="New Password"
          onChange={(event) => setNewPassword(event.target.value)}
          required
        />
        <input className="btn btn-primary" type="submit" value="Reset" />
      </form>
     </div>
    </div>
  );
}

export default ForgetPassword;
