import React from 'react'
import Productfrom from '../Forms/Productfrom'

function AddProduct({categories, createProduct , setCategory, name ,setName, photo, setPhoto , desc , setDesc ,price, setPrice , quantity , setQuantity, shipping, setShipping}) {
  return (
    <div className='mt-3' >   
    <Productfrom categories={categories} createProduct={createProduct} 
    setCategory={setCategory} name={name} setName={setName} setPhoto={setPhoto}
     photo={photo} desc={desc} setDesc={setDesc} price={price} setPrice={setPrice}
      quantity={quantity} setQuantity={setQuantity} setShipping={setShipping} shipping={shipping}/>
      </div>
  )
}

export default AddProduct