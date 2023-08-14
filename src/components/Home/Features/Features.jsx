import React from 'react'
import Featuresitem from './Featuresitem/Featuresitem'
import ban1 from "../../../assets/FeaturesCard/icon-1.svg"
import ban2 from "../../../assets/FeaturesCard/icon-2.svg"
import ban3 from "../../../assets/FeaturesCard/icon-3.svg"
import ban4 from "../../../assets/FeaturesCard/icon-4.svg"

function Features(props) {
  const title1 = "Best prices & offers"
const para1 = "Orders $50 or more"
const title2 = "Free delivery"
const para2 = "24/7 amazing services"
const title3 = "Great daily deal"
const para3 = "When you sign up"
const title4 = "Wide assortment"
const para4 = "Mega Discounts"
  return (
    <div className='mx-0 my-0 px-3 py-4 row'>
        <Featuresitem img={ban1} title={title1} para={para1}/>
        <Featuresitem img={ban2} title={title2} para={para2}/>
        <Featuresitem img={ban3} title={title3} para={para3}/>
        <Featuresitem img={ban4} title={title4} para={para4}/>
    </div>
  )
}

export default Features