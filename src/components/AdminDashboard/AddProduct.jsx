import React from 'react'
import Productfrom from '../Forms/Productfrom'

function AddProduct({categories, createProduct , setCategory, name ,setName, mainPhoto, setMainPhoto, setHoverPhoto, hoverPhoto , desc , setDesc ,price, setPrice , quantity , setQuantity, stock, setstock, salername, setSalername, discount, setDiscount}) {
  return (
    <div className='mt-3' >   
    <Productfrom categories={categories} createProduct={createProduct} 
    setCategory={setCategory} name={name} setName={setName} setMainPhoto={setMainPhoto}
    mainPhoto={mainPhoto} hoverPhoto={hoverPhoto} setHoverPhoto={setHoverPhoto} desc={desc} setDesc={setDesc} price={price} setPrice={setPrice}
      quantity={quantity} setQuantity={setQuantity} setstock={setstock} stock={stock} salername={salername} setSalername={setSalername} discount={discount} setDiscount={setDiscount}/>
      </div>
  )
}

export default AddProduct