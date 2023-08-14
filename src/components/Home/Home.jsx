import React from 'react'
import "./Home.css"
import VarietyCard from '../VarietyCard/VarietyCard'
import Popularproducts from './PopularProducts/Popularproducts'
import DailyBestSales from './DailyBestSales/DailyBestSales'
import Banner from "./Banner/Banner"

function Home() {
  return (
    <div>
      <Banner/>
       <VarietyCard/>
       <Popularproducts/>
       <DailyBestSales/>

    </div>
  )
}

export default Home