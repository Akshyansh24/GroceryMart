import React from 'react'
import "./Featuresitem.css"
// import ban1 from "../../../../assets/FeaturesCard/icon-1.svg"
function Featuresitem({title, para,img}) {
  return (
    <div className=' col-md-3 '>
        <div className="features-card ">
                <div className="features-card-img">
                    <img className='w-100' src={img} alt=""  />
                </div>
                <div className="features-card-content mt-2">
                    <h3 >{title}</h3>
                    <p>{para}</p>
                </div>
        </div>
    </div>
  )
}

export default Featuresitem