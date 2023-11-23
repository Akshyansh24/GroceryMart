import React, { useContext, useState } from "react";
import { Context } from "../../utils/context";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function LoginForm({setForgetPasswordShow, setShowRegister}) {
const { auth, setAuth } = useContext(Context);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();
const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.success(res.data.message);
        navigate(location.state || "/ ");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} action="">
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
          type="password"
          value={password}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <span>
          <p
            onClick={() => {
              setForgetPasswordShow(true);
            }}
          >
            Forget Password
          </p>
        </span>
        <input className=" submit-btn" type="submit" value="Sign In" />
      </form>
      <div className="register-area">
        <p>Don't have account</p>
        <span className="register-area-span" onClick={()=>{setShowRegister(true); setForgetPasswordShow(false)}}>Sign Up Now</span>
      </div>
    </>
  );
}

export default LoginForm;
