import {React, useContext, useState} from 'react'
import { toast } from 'react-toastify';
import {useNavigate } from "react-router-dom"
import axios from "axios";
function ForgetPassword({setShowRegister,setForgetPasswordShow}) {
    
  const navigate  = useNavigate();
  
    const [email,setEmail] = useState('');
    const [answer,setAnswer] = useState('');
    const [newpassword,setNewPassword] = useState('');

    const handleForgetPassword = async(event) =>{
      event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/forget-password`, {email, answer, newpassword});          
            if(res.data.success){

                toast.success(res.data.message);
                setShowRegister(false); 
                setForgetPasswordShow(false);

            }else{
                toast.error(res.data.message);

            }
        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong");
        }
 
    }

  return (
    <>
              <form onSubmit={handleForgetPassword} action="">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <input
                  className="mt-3"
                  placeholder="Enter your password"
                  value={newpassword}
                  name="password"
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                />
                <input
                  className="mt-3"
                  type="text"
                  value={answer}
                  name="answer"
                  placeholder="What is your favorite sports ?"
                  onChange={(event) => setAnswer(event.target.value)}
                  required
                />
                <input
                  className="mt-3 submit-btn"
                  type="submit"
                  value="Reset Password"
                />
              </form>
              <div className="register-area">
              <p>Don't have account</p>
              <span className="register-area-span" onClick={()=>{setShowRegister(true); setForgetPasswordShow(false)}}>Sign Up Now</span>
            </div>
            </>
  );
}

export default ForgetPassword;
