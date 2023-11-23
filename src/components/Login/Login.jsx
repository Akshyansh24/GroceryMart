import { React, useContext, useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../utils/context";
import loginImg from "../../assets/Others/loginImg.png";
import LoginForm from "./LoginForm";
import ForgetPassword from "./ForgetPassword";
import Register from "./Register";
function Login() {
  const [forgetpasswordshow, setForgetPasswordShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [forgetpasswordshow, showRegister])
  
  return (
    <div className="user-box">
      {/* <div className="col-md-12 mt-4 mb-4 d-flex justify-content-center">
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
        </div> */}

      <div className="col-md-12 d-flex" style={{ justifyContent: "center" }}>
        <div className="col-md-4">
          <div className="card shadow">
            {forgetpasswordshow === false && showRegister === false && <span className="heading-span">Sign In</span>}
            {forgetpasswordshow === true && showRegister === false && <span className="heading-span">Forget Password</span>}
            {forgetpasswordshow === false && showRegister === true && <span className="heading-span">Sign Up</span>}
            <div className="card-body mt-4">
              {forgetpasswordshow === false && showRegister === false && 
              <>
              <LoginForm setShowRegister={setShowRegister} setForgetPasswordShow={setForgetPasswordShow} />
              </>}
              {forgetpasswordshow === true && showRegister === false && 
              <ForgetPassword setForgetPasswordShow={setForgetPasswordShow} setShowRegister={setShowRegister}/>
              }
               {forgetpasswordshow === false && showRegister === true && 
              <Register setShowRegister={setShowRegister}/>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
