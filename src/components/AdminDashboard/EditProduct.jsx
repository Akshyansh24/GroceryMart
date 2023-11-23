import React from 'react'
import Productfrom from '../Forms/Productfrom'

function EditProduct({categories, createProduct , setCategory, name ,setName, mainPhoto, setMainPhoto , Estock, hoverPhoto, setHoverPhoto, desc , setDesc ,price, setPrice , quantity , setQuantity, setstock, ESaler , Ecategory , editProductModel, eproductId ,handleUpdateProduct}) {
 
  return (
    <div className='mt-3'>
    <Productfrom categories={categories} createProduct={createProduct} 
    setCategory={setCategory} name={name} setName={setName} setMainPhoto={setMainPhoto}
    mainPhoto={mainPhoto} hoverPhoto={hoverPhoto} setHoverPhoto={setHoverPhoto} desc={desc} setDesc={setDesc} price={price} setPrice={setPrice}
      quantity={quantity} setQuantity={setQuantity} setstock={setstock} Estock={Estock} Ecategory={Ecategory} editProductModel={editProductModel} eproductId={eproductId}  handleUpdateProduct={handleUpdateProduct}/>
    </div>
  )
}

export default EditProduct