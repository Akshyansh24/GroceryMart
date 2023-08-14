import React from 'react'
import Productfrom from '../Forms/Productfrom'

function EditProduct({categories, createProduct , setCategory, name ,setName, photo, setPhoto , desc , setDesc ,price, setPrice , quantity , setQuantity, setShipping, Eshipping , Ecategory , editProductModel, eproductId ,handleUpdateProduct}) {
 
  return (
    <div className='mt-3'>
    <Productfrom categories={categories} createProduct={createProduct} 
    setCategory={setCategory} name={name} setName={setName} setPhoto={setPhoto}
     photo={photo} desc={desc} setDesc={setDesc} price={price} setPrice={setPrice}
      quantity={quantity} setQuantity={setQuantity} setShipping={setShipping} Eshipping={Eshipping} Ecategory={Ecategory} editProductModel={editProductModel} eproductId={eproductId}  handleUpdateProduct={handleUpdateProduct}/>
    </div>
  )
}

export default EditProduct