import React, { useContext } from 'react'
import "./Products.css"
import Product from "./Product/Product"
import { Context } from '../../utils/context'

// import prod1default from "../../assets/Products/product-1-1.jpg"
// import prod1hover from "../../assets/Products/product-1-2.jpg"
// const category = "snacks";
// const name= "Seeds of Change Organic Quinoa, Brown, & Red Rice";
// const vendorName = "Nest";
// const price = 31.2;
function Products({ defaultimg , hoverimg , category, price , name , vendorName}) {
  const{products} = useContext(Context);

  return (
    <div>
      <div className="row">
      {products?.map((p)=>(
                <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-photo/${p._id}`} price={p.price} 
                 pid={p._id}  Pcategory={p.category}/>
                ))}
          {/* <Product defaultimg={defaultimg} hoverimg={hoverimg} category={category} price={price} name={name} vendorName={vendorName}/>
          <Product defaultimg={defaultimg} hoverimg={hoverimg}  category={category} price={price} name={name} vendorName={vendorName}/>
          <Product defaultimg={defaultimg} hoverimg={hoverimg}  category={category} price={price} name={name} vendorName={vendorName}/>
          <Product defaultimg={defaultimg} hoverimg={hoverimg}  category={category} price={price} name={name} vendorName={vendorName}/> */}
        </div>
    </div>
  )
}

export default Products