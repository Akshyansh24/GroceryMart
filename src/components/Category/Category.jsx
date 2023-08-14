import React, { useEffect, useState } from "react";
import "./Category.css";
import Products from "../Products/Products";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../Products/Product/Product";

function Category() {
  const [catwiseProducts, setCatwiseProducts] = useState([]);
  const [categoryWise, setCategoryWise]= useState([])
  const  cid  = useParams();


  const getProductsByCategory = async() =>{
    try {

      let {data} = await axios.get(`${process.env.REACT_APP_API}/api/products/product-category/${cid.id}`)
      setCatwiseProducts(data?.products);
      setCategoryWise(data?.category)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductsByCategory();
  }, [cid])
  
  console.log(catwiseProducts);
  console.log(categoryWise);
  return (
    <div>
      <div className="category-banner">
        <div className="row">
          <div className="col-md-4">
            <h1>Snacks</h1>
          </div>
          <div className="col-md-8 d-flex justify-content-end">
            <div className="breadcrumbs">
                <span className="breadcrumb-first"><i className="fa-solid fa-house"></i> Home</span>
                <span><i className="fa-solid fa-angle-right"></i></span>
                <span>Category</span>
                <span><i className="fa-solid fa-angle-right"></i></span>
                <span>{categoryWise.name}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="category-products">
        <p className="total-products">We Found <span>{`${catwiseProducts.length}`}</span> Products In This Category !</p>
       <div className="row">
       {catwiseProducts.map((p)=>(
          <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-photo/${p._id}`} price={p.price} 
          pid={p._id} Pcategory={p.category} />
        ))}
       </div>

{/*   
        {catwiseProducts.map((p)=>(

        ))} */}
      </div>
    </div>
  );
}

export default Category;
