import React, { useState } from 'react'
import "./RelatedProducts.css"
import Product from '../../Products/Product/Product'
function RelatedProducts(relatedProducts) {
// console.log(relatedProducts.relatedProducts);
// console.log(relatedProducts.relatedProducts.length);
  return (
    <>
      { relatedProducts.relatedProducts.length > 1 && <div className='Section-box' style={{margin:"30px 90px"}}>
      
      <div className="section-title">
        <h3>Related Products</h3>
      </div>
      <div className="row">
        {relatedProducts.relatedProducts.map((p)=>(
           <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-photo/${p._id}`} price={p.price} 
           pid={p._id} Pcategory={p.category}/>
        ))}
      </div>
    </div>}
    </>
  )
}

export default RelatedProducts