import { React, useContext, useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import "./AdminDashboard.css";
import { toast } from "react-toastify";
import { Context } from "../../utils/context";
import axios from "axios";
import Categoryform from "../Forms/Categoryform";
import {Modal} from "antd"
import {Select} from "antd"
import Productfrom from "../Forms/Productfrom";
import Product from "../Products/Product/Product";
import Products from "../Products/Products";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import MiniLoader from "../Loader/MiniLoader";

const {Option} = Select

function AdminDashboard(props) {

  // Context
  const { categories,  getAllCategory ,products,  getAllProducts} = useContext(Context);

  // Mini Loader State;
  const[miniLoading , SetminiLoading] = useState(false);

  // Get All Categories State
  const { auth, showTabs } = useContext(Context);

  // Create Category State and Update STate
  const [categoryname,setCategoryname] = useState("");
  const[selected, setSelected] = useState(null);
  const[updatedName, setUpdateName]= useState("");
  const [categoryModel, setCategoryModel] = useState(false);
  const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
  
  // Create Category
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, {name:categoryname})
      if(data?.success){
        toast.success(`${categoryname} is created`)
        getAllCategory();
        setCategoryname("")
        setCategoryModel(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("something Went Wrong In Input Form")
    }
  }

  // Update Category
  const handleUpdate = async(e) =>{
    e.preventDefault();
    try {
      const{data} = await axios.put(`${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdateName("");
        setUpdateCategoryModel(false);
        getAllCategory();

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  // Delete Category Function
  const handleDelete = async(pId) =>{
    try {
      const{data} = await axios.delete(`${process.env.REACT_APP_API}/api/category/delete-category/${pId}`)
      if(data.success){
        toast.success(`Category is Deleted`);
        getAllCategory();

      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }

  // For Create  Products
  const [productModel, setProductModel] = useState(false);
  // Product Details
  const [mainPhoto, setMainPhoto] = useState("");
  const [hoverPhoto, setHoverPhoto] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stock, setstock] = useState("");
  const [salername, setSalername] = useState(auth?.user.name);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState();
  
  const createProduct = async(e) =>{
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("desc", desc)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("mainPhoto", mainPhoto)
      productData.append("hoverPhoto", hoverPhoto)
      productData.append("category", category)
      productData.append("stock", stock)
      productData.append("salername", salername)
      productData.append("discount", discount)
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/products/create-product`, productData)

      if(data.success){
        toast.success(data.message)
        setProductModel(false)
        getAllProducts();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong while adding product")
    }

  }


// Get All Products
// const [products, setProducts] = useState([]);
//   const getAllProducts = async () =>{
//     try {
//       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/products/get-product`)
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong while adding product")
//     }
//   }

  // Edit Product
  const [editProductModel, seteditProductModel] = useState(false);
  // For Edit Product
  const[eproductId, setEProductId] = useState("");
  const [eMainPhoto, setEMainPhoto] = useState("");
  const [eHoverPhoto, setEHoverPhoto] = useState("");
  const [ename, setEName] = useState("");
  const [edesc, setEDesc] = useState("");
  const [eprice, setEPrice] = useState("");
  const [equantity, setEQuantity] = useState("");
  const [estock, setEstock] = useState();
  const [esalername, setESalername] = useState(auth?.user.name);
  const [ecategory, setECategory] = useState("");

  // Edit Product
  const getSingleProduct = async (pId) =>{

      await axios.get(`${process.env.REACT_APP_API}/api/products/get-product/${pId}`).then((res)=>{
        setEProductId(res.data.product._id)
        setEName(res.data.product.name);
        setEDesc(res.data.product.desc);
        setEPrice(res.data.product.price)
        setEQuantity(res.data.product.quantity);
        setEstock(res.data.product.stock);
        setECategory(res.data.product.category._id);
        setESalername(res.data.product.salername);
        mainPhoto && setEMainPhoto(res.data.product.mainPhoto);
        hoverPhoto && setEHoverPhoto(res.data.product.hoverPhoto);
        seteditProductModel(true);
      }).catch((error)=>{
        console.log(error);
        toast.error("Something Went Wrong while getting Single product");
        seteditProductModel(false)
      }
      )

}


  const clearAll = () =>{
    setEName("");
    setEDesc("");
    setEPrice("")
    setEQuantity("");
    setEstock("");
    setECategory("");
    setEMainPhoto("")
    setEHoverPhoto("")
  }
  
  const handleUpdateProduct = async(e) =>{
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name", ename)
      productData.append("desc", edesc)
      productData.append("price", eprice)
      productData.append("quantity", equantity)
      // photo &&  productData.append("photo", ephoto)
       productData.append("mainPhoto", eMainPhoto)
       productData.append("hoverPhoto", eHoverPhoto)
      productData.append("category", ecategory)
      productData.append("stock", estock)
      productData.append("salername", esalername)
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/products/update-product/${eproductId}`, productData)

      if(data.success){
        toast.success(data.message);
        seteditProductModel(false);
        getAllProducts();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong while adding product")
    }
  }


  // Delete Product
  const handleDeleteProduct = async (pid)=>{
    try {
      let answer = window.confirm("Are you really want to delete this product ?");
      if(!answer) return;
      const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/products/delete-product/${pid}`);
      toast.success("Delete Product Successfully")
      getAllProducts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleteing Product")
    }
  }


  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getAllOrders();
  }, []);


  // For Orders
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState(["Not Process", "Processing", "stock", "Delivered","Cancelled"]);
  const [changeStatus, setChangeStatus] = useState("")
  const getAllOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/all-orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

    // For Order Product Details
    const [orderProductDetail, setOrderProductDetail] = useState([]);
    const [showOrderProductTable, setOrderProductTable] = useState(false);
    const getProductDetail = async (pid) => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API}/api/products/getorderproduct/${pid}`
        );
        console.log(data.product.cartItem);
        setOrderProductDetail(data.product.cartItem);
        setOrderProductTable(true);
      } catch (error) {
        console.log(error);
      }
    };

    // For Status Update
    const handleStatusChange = async(value, orderId) =>{
      // let answer = window.confirm(`Sttaus update to ${value}`);
      // if(!answer) return;
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API}/api/auth/order-status/${orderId}`,{status:value}
        );
        getAllOrders();
        toast.success(data.message)
      } catch (error) {
        console.log(error);
      }
    }
  
  return (
    <div className="dashboard-container">
      <div className="row">
        <AdminMenu />
        <div className="col-md-9 py-1">
          {showTabs == 1 && (
            <div className="dashboard-box">
              <div className="dashboard-header">
                <h3>{`Hello ${auth.user.name}`}</h3>
              </div>
            </div>
          )}

          {showTabs == 2 && (
            <div className="dashboard-box">
              <div className="dashboard-header">
                <div className="row">
                  <div className="col-md-6">
                  <h3>Manage Category</h3>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn-custom-green add-btn" onClick={()=>{setCategoryModel(true);}}><i className="fa-solid fa-plus mx-1"></i>Add</button>
                  </div>
                </div>
          
              </div>
              <div className="dashboard-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => (
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className="btn btn-primary" onClick={()=>{setUpdateCategoryModel(true); setUpdateName(c.name); setSelected(c)}}>Edit</button>
                            <button className="btn btn-danger mx-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {showTabs == 3 && (
            <div className="dashboard-box">
                 <div className="dashboard-header">
                <div className="row">
                  <div className="col-md-6">
                  <h3>Manage Products</h3>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    {/* Configration for showing buttons  */}
                    {(productModel == true || editProductModel == true) ? ( <button className="btn-custom-green add-btn" onClick={()=>{setProductModel(false); seteditProductModel(false); clearAll() }}><i className="fa-solid fa-angle-left"></i> Back</button> ) : (<button className="btn-custom-green add-btn" onClick={()=>{setProductModel(true);}}><i className="fa-solid fa-plus mx-1"></i>Add</button>)  }
                  </div>
                </div>
              </div>
              <div className="dashboard-body">
                {miniLoading == true && <MiniLoader/>}
                {productModel == true && 
                 <AddProduct categories={categories} createProduct={createProduct} 
                 setCategory={setCategory} name={name} setName={setName} setMainPhoto={setMainPhoto}
                  mainPhoto={mainPhoto} hoverPhoto={hoverPhoto} setHoverPhoto={setHoverPhoto} desc={desc} setDesc={setDesc} price={price} setPrice={setPrice}
                   quantity={quantity} setQuantity={setQuantity} setstock={setstock} stock= {stock} salername={salername} discount={discount} setDiscount={setDiscount} />}
               
                
                {productModel == false &&  editProductModel == false  &&
                 <div className="row">
                {products?.map((p)=>(
                <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-mainphoto/${p._id}`} hoverimg={`${process.env.REACT_APP_API}/api/products/product-hoverphoto/${p._id}`}  price={p.price} 
                 pid={p._id} salername={p.salername} seteditProductModel= {seteditProductModel}  editclick={getSingleProduct}  handleDeleteProduct={handleDeleteProduct} Pcategory={p.category}/>
                ))}
              </div>}
                

            {editProductModel == true && 
            <EditProduct categories={categories} createProduct={createProduct} setMainPhoto={setEMainPhoto}
            mainPhoto={mainPhoto} hoverPhoto={eHoverPhoto} setHoverPhoto={setHoverPhoto}
            setCategory={setECategory} name={ename} setName={setEName}  desc={edesc} setDesc={setEDesc} price={eprice} setPrice={setEPrice}
              quantity={equantity} setQuantity={setEQuantity} Estock={estock} setstock={setEstock} Ecategory={ecategory}
               editProductModel={editProductModel} eproductId={eproductId} salername={esalername} handleUpdateProduct={handleUpdateProduct}/>}
              </div>
            </div>
          )}

{showTabs == 4 && (
            <div className="dashboard-box">
                 <div className="dashboard-header">
                <div className="row">
                  <div className="col-md-6">
                  <h3>Manage Orders</h3>
                  </div>
                 
                </div>
              </div>
              <div className="dashboard-body">
                <table className="shopping-table  table-bordered">
                  <thead>
                    <tr>
                      <th className="sr-no text-center">#</th>
                      <th className="text-center">Status</th>
                      <th className="text-center" scope="col">
                        Buyer Name
                      </th>
                      <th className="text-center" scope="col">
                        Payment
                      </th>
                      <th className="text-center" scope="col">
                        Total Payment
                      </th>
                      <th className="text-center" scope="col">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <>
                      {orders.map((o, i) => (
                        <tr>
                          <td>{1 + i}</td>
                          <td>
                            <select className="form-select" name="status" id="" defaultValue={o.status} onChange={(e)=>{handleStatusChange(e.target.value,o._id)}}>
                              {status.map((s,i)=>(
                                <option key={i} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td>{o.buyer.name}</td>
                          <td>
                            {o.payment.success == true ? "Success" : "Cancel"}
                          </td>
                          <td>{o.payment.transaction.amount}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                getProductDetail(o._id);
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                </table>

               {showOrderProductTable === true &&  <table className="shopping-table table-bordered product-table table-responsive" style={{height:"200px"}}>
                  <thead>
                    <tr>
                      <th className="sr-no text-center">#</th>
                      <th className="text-center" colSpan={2}>Product</th>
                      <th className="text-center" scope="col">
                        Unit Price
                      </th>
                      <th className="text-center" scope="col">
                        Quanity
                      </th>
                      <th className="text-center" scope="col">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderProductDetail.map((p, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td className="product-img">
                          <div className="image-thumbnail">
                            <img
                              src={`${process.env.REACT_APP_API}/api/products/product-mainPhoto/${p._id}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <h6>{p.name}</h6>
                        </td>
                        <td>
                          <h4 className="text-body-color">&#8377;{p.price}</h4>
                        </td>

                        <td>
                          <h4 className="text-body-color-green">
                            {p.cartQuantity}
                          </h4>
                        </td>
                        <td>
                          <h4 className="text-body-color-green">
                            {p.category.name}
                          </h4>
                        </td>
                      </tr>
                    ))}

                    
                  </tbody>
                </table>}
              </div>
            </div>
          )}

          
        </div>

            
            <Modal onCancel={()=>{setCategoryModel(false)}} footer={null} open={categoryModel}>
              <Categoryform handleSubmit = {handleSubmit} value={categoryname} setValue={setCategoryname}/>
            </Modal>

            <Modal onCancel={()=>{setUpdateCategoryModel(false)}} footer={null} open={updateCategoryModel}>
              <Categoryform value={updatedName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
            </Modal>

      </div>
    </div>
  );
}

export default AdminDashboard;
