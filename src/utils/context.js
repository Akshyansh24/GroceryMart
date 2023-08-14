import {createContext, useState, useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { json, useLocation } from "react-router-dom";

export const Context = createContext();


const AppContext = ({children}) =>{

const [showOldprice , setshowOldprice] = useState(true);
const[showOk, setShowOk] = useState(false);
const [auth,setAuth] = useState(
    {user:null,
    token:""}
);

const [showTabs, setShowTabs] = useState(1);


// Admin Page


// console.log(selectedProduct);
// default axios
axios.defaults.headers.common["Authorization"] = auth?.token


// Get All Categories
const [categories, setCategories] = useState([]);
const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category");
    }
  };

// For All Products
  const [products, setProducts] = useState([]);
  const getAllProducts = async () =>{
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/products/get-product`)
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong while adding product")
    }
  }


  // Search-PRoduct

  const[searchProduct,setSearchProduct] = useState([])
useEffect(() => {
  
    const data = localStorage.getItem('auth');
    if(data){
        const parseData = JSON.parse(data)
        setAuth({
            ...auth,
            user:parseData.user,
            token: parseData.token
        })
    }

    const cartdata = localStorage.getItem('cart');
    if(cartdata){
      // setCartItem([...cartItem, json.parse(cartdata)])

      setCartItem(JSON.parse(cartdata))
      console.log(JSON.parse(cartdata));
    }
    getAllProducts();
    getAllCategory();
}, [])


const location = useLocation();
useEffect(() => {
  window.scrollTo({top: 0, behavior: 'smooth'});
  console.log(cartItem);
}, [location])


// Cart
const[cartItem, setCartItem] = useState([]);

// Product Add in cart with cart quantity
const handleAddToCart = (product, quantity) =>{
  let items = [...cartItem]
  let index = items.findIndex(p => p._id === product._id)
  if(index !== -1){
    items[index].cartQuantity += quantity
  }else{
    product.cartQuantity = quantity
    items = [...items, product]
  }
  setCartItem(items);
  localStorage.setItem('cart', JSON.stringify([...items]))
}




// Product Remove from the Cart
const handleRemoveFromCart = (product) =>{
  let items = [...cartItem];
  items = items.filter(p=> p._id !== product._id)
  setCartItem(items);
  localStorage.setItem('cart', JSON.stringify([...items]));
}


// Handle Product Quantity in Cart

const handleCartProductQuantity = (type, product) =>{
  // if(type === "inc"){
  //   console.log("increment");
  // }else if(type === "dec"){
  //   console.log("decrement");
  // }
  let items = [...cartItem]
  let index = items.findIndex(p => p._id === product._id)
  if(type === "inc"){
    items[index].cartQuantity += 1
  }else if(type === "dec"){
    if(items[index].cartQuantity === 1) return;
    items[index].cartQuantity -=1
  }
  setCartItem(items);
  localStorage.setItem('cart', JSON.stringify([...items]))

}


        return (
            <Context.Provider value={{
                showOldprice,
                setshowOldprice,
                auth,
                setAuth,
                showOk,
                setShowOk,
                categories,
                getAllCategory,
                showTabs,
                setShowTabs,
                products,
                getAllProducts,
                searchProduct,
                setSearchProduct,
                cartItem,
                setCartItem,
                handleAddToCart,
                handleRemoveFromCart,
                handleCartProductQuantity,
                }}>
                {children}
            </Context.Provider>
        )
}

export default AppContext;
