import {React, useState, useEffect} from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import "./Loader.css"
import Loaderimg from "../../assets/Loader/loading.gif"

function Loader() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const interval = setInterval(()=>{
        setCount((prevValue)=> -- prevValue)
      },1000)
      count === 0 && navigate('/login',{
        state: location.pathname
      })
      return () => clearInterval(interval);
    }, [count, navigate, location])
    
  return (
    <div className='preloader d-flex align-items-center justify-content-center'>
        <div className="pre-loader-inner">
            <div className="text-center">
                <img src={Loaderimg} alt="" />
                <h3>{`${count}`}</h3>
            </div>
        </div>
    </div>
  )
}

export default Loader
