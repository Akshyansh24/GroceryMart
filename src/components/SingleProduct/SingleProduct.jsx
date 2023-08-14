import React, {useState ,useEffect, useContext } from 'react';
import { useParams, useLocation } from "react-router-dom";
import "./SingleProduct.css";
import singleProd1 from "../../assets/Products/Single-product-1.jpg";
import singleProd2 from "../../assets/Products/Single-product-1-1.jpg";
import axios from 'axios';
import { toast } from 'react-toastify';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import { Context } from '../../utils/context';
function SingleProduct() {
  const { pid } = useParams();
  const [singleProd , setSingleProd] = useState([]);

  let attri = ""
  const getSingleProduct = async() =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/products/get-product/${pid}`);
      setSingleProd(data.product)

      similarProducts(data.product._id, data.product.category._id)
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong while getting Single product")
    }
}



// Get Similar PRoducts
const [relatedProducts, setRelatedProducts] = useState([]);
const similarProducts = async(pid, cid) =>{
  try {
    let {data} = await axios.get(`${process.env.REACT_APP_API}/api/products/related-products/${pid}/${cid}`)
    setRelatedProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
}



// Zoomer function 

const zoomer = () =>{
  const imgConstElm = document.querySelector('.zoom-container');
  const imgElm = document.querySelector('.zoom-container img');
  const listproductsElm = document.querySelector('.list-products');
  const Zoom = 200;

  const handleMouseEnter = () => {
    imgElm.style.width = `${Zoom}%`;
  };

  const handleMouseLeave = () => {
    imgElm.style.width = '80%';
    imgElm.style.top = '25px';
    imgElm.style.left = '30px';
  };

  const handleMouseMove = (mouseEvent) => {
    let obj = imgConstElm;
    let obj_left = 0;
    let obj_top = 0;
    let xpos;
    let ypos;

    while (obj.offsetParent) {
      obj_left += obj.offsetLeft;
      obj_top += obj.offsetTop;
      obj = obj.offsetParent;
    }

    if (mouseEvent) {
      xpos = mouseEvent.pageX;
      ypos = mouseEvent.pageY;
    } else {
      xpos = window.event.x + document.body.scrollLeft - 2;
      ypos = window.event.y + document.body.scrollTop - 2;
    }

    xpos -= obj_left;
    ypos -= obj_top;

    const imgWidth = imgElm.clientWidth;
    const imgHeight = imgElm.clientHeight;

    imgElm.style.top = -(((imgHeight - imgConstElm.clientHeight) * ypos) / imgConstElm.clientHeight) + 'px';
    imgElm.style.left = -(((imgWidth - imgConstElm.clientWidth) * xpos) / imgConstElm.clientWidth) + 'px';
  };

  const handleClick = (productElm) => {
    const newSrc = productElm.querySelector('img').src;
    imgElm.src = newSrc;

    Array.from(listproductsElm.children).forEach((prod) => prod.classList.remove('active'));
    productElm.classList.add('active');
  };

  const changeHeight = () => {
    imgConstElm.style.height = imgConstElm.clientWidth + 'px';
  };

  imgConstElm.addEventListener('mouseenter', handleMouseEnter);
  imgConstElm.addEventListener('mouseleave', handleMouseLeave);
  imgConstElm.addEventListener('mousemove', handleMouseMove);

  Array.from(listproductsElm.children).forEach((productElm) => {
    productElm.addEventListener('click', () => handleClick(productElm));
  });

  changeHeight();
  window.addEventListener('resize', changeHeight);

  return () => {
    imgConstElm.removeEventListener('mouseenter', handleMouseEnter);
    imgConstElm.removeEventListener('mouseleave', handleMouseLeave);
    imgConstElm.removeEventListener('mousemove', handleMouseMove);

    Array.from(listproductsElm.children).forEach((productElm) => {
      productElm.removeEventListener('click', () => handleClick(productElm));
    });

    window.removeEventListener('resize', changeHeight);
  };
}

// Cart functionality
const {handleAddToCart,  cartItem } = useContext(Context);

// For everytime Page Load
  useEffect(() => {
    getSingleProduct();
    zoomer();
  }, []);


  // For Everytime location change
const location = useLocation();
useEffect(()=>{
  getSingleProduct();
},[location])
  


  const [quantity, setQuantity] = useState(1);
  const increament = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const decreament = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  };

  return (
    <div>
      <div className="single-product">
        <div className="row justify-content-between">
          <div className="col-md-5 d-flex justify-content-center">
            <div className="single-product-img">
              <div className="zoom-container">
                <img src={`${process.env.REACT_APP_API}/api/products/product-photo/${pid}`} alt="" />
              </div>
              <ul className="list-products">
                <li className="active">
                  <img src={`${process.env.REACT_APP_API}/api/products/product-photo/${pid}`} alt=""  />
                </li>
                <li>
                  <img src={singleProd2} alt="" />
                </li>
                <li>
                  <img src={singleProd1} alt=""  />
                </li>
                <li>
                  <img src={singleProd2} alt=""  />
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-product-detail">
              <span className="status">Hot</span>
              <h2 className="product-title">{singleProd.name}</h2>
              <h3 className="product-price">Rs - {singleProd.price}/- </h3>
              <span className="old-price">$52</span>
              <p className="desc">
                {singleProd.desc}
              </p>
              <div className="product-qty d-flex">
                <strong>Size/Weight</strong>
                <ul>
                  <li>60 gm</li>
                </ul>
              </div>
              <div className="cart-buttons">
                <div className="quantity-buttons">
                  <span onClick={increament}>+</span>
                  <span>{quantity}</span>
                  <span onClick={decreament}>-</span>
                </div>
                <button className="addToCart" onClick={()=>{handleAddToCart(singleProd, quantity);  setQuantity(1);}}>
                <i className="fa-solid fa-cart-shopping"></i>
                Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProducts relatedProducts={relatedProducts}/>
    </div>
  );
}

export default SingleProduct;
