import React from 'react'
import "./VarietyCard.css"
import VarietyCardimg1 from "../../assets/VarietyCard/Vc-1.png"
import VarietyCardimg2 from "../../assets/VarietyCard/Vc-2.png"
import VarietyCardimg3 from "../../assets/VarietyCard/Vc-3.png"
import VarietyCardItems from './VarietyCardItems/VarietyCardItems'
function VarietyCard(props) {
 const title = "Make your Breakfast Healthy and Easy"

  return (
    <div>
        <div className="variety-card">
            <div className="row">
            <div className="col-md-4">
              <VarietyCardItems title={title}  cardimg= {VarietyCardimg1} />
            </div>
            <div className="col-md-4">
              <VarietyCardItems title={title} cardimg={VarietyCardimg2}/>
            </div>
            <div className="col-md-4">
              <VarietyCardItems title={title} cardimg={VarietyCardimg3}/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default VarietyCard