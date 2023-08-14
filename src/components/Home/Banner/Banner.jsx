import React from 'react'
import "./Banner.css"
import Carousel from 'react-bootstrap/Carousel';


function Banner() {
  return (
    <div>
      <div className="row banner" style={{margin:0}}>
        <div className="col-md-8">
        <Carousel>
      <Carousel.Item>
      <div className="item-1">
      <h1>Pure Coffee <br />Big Discount</h1>
          <p>Sign up for the daily newsletter</p>
     <form action="" className='subscribe'>
          <i className="fa fa-paper-plane"></i>
        <input type="email" placeholder='Your email address' />
        <button type='submit' className='btn-subscribe'>Subscribe</button>
     </form>
      </div>
        
      </Carousel.Item>
      <Carousel.Item>
      <div className="item-2">
         
          <h1>Snacks box <br />daily save</h1>
      <p>Sign up for the daily newsletter</p>
      <form action="" className='subscribe'>
      <i className="fa fa-paper-plane"></i>
        <input type="email" placeholder='Your email address' />
        <button type='submit' className='btn-subscribe'>Subscribe</button>
     </form>
        
      </div>
        
      </Carousel.Item>
    </Carousel>
        </div>
        <div className="col-md-4 left-banner"> 
        <h2>Delivered <br />to <span>your <br /> home</span> </h2>
        </div>
      </div>
    </div>
  )
}

export default Banner