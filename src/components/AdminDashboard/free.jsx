// import { React, useContext, useEffect, useState } from "react";
// import AdminMenu from "./AdminMenu";
// import "./AdminDashboard.css";
// import { toast } from "react-toastify";
// import { Context } from "../../utils/context";
// import axios from "axios";
// import Categoryform from "../Forms/Categoryform";
// import {Modal} from "antd"
// import {Select} from "antd"
// import Productfrom from "../Forms/Productfrom";
// import Product from "../Products/Product/Product";
// import Products from "../Products/Products";
// import EditProduct from "./EditProduct";
// import AddProduct from "./AddProduct";
// import MiniLoader from "../Loader/MiniLoader";

// const {Option} = Select

// function AdminDashboard(props) {

//   // Context
//   const { categories,  getAllCategory ,products,  getAllProducts} = useContext(Context);

//   // Mini Loader State;
//   const[miniLoading , SetminiLoading] = useState(false);

//   // Get All Categories State
//   const { auth, showTabs } = useContext(Context);

//   // Create Category State and Update STate
//   const [categoryname,setCategoryname] = useState("");
//   const[selected, setSelected] = useState(null);
//   const[updatedName, setUpdateName]= useState("");
//   const [categoryModel, setCategoryModel] = useState(false);
//   const [updateCategoryModel, setUpdateCategoryModel] = useState(false);
  
//   // Create Category
//   const handleSubmit = async(e) =>{
//     e.preventDefault();
//     try {
//       const {data} = await axios.post(`${process.env.REACT_APP_API}/api/category/create-category`, {name:categoryname})
//       if(data?.success){
//         toast.success(`${categoryname} is created`)
//         getAllCategory();
//         setCategoryname("")
//         setCategoryModel(false)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something Went Wrong In Input Form")
//     }
//   }





//   // Update Category
//   const handleUpdate = async(e) =>{
//     e.preventDefault();
//     try {
//       const{data} = await axios.put(`${process.env.REACT_APP_API}/api/category/update-category/${selected._id}`, {name:updatedName})
//       if(data.success){
//         toast.success(`${updatedName} is updated`);
//         setSelected(null);
//         setUpdateName("");
//         setUpdateCategoryModel(false);
//         getAllCategory();

//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error("Something Went Wrong")
//     }
//   }

//   // Delete Category Function
//   const handleDelete = async(pId) =>{
//     try {
//       const{data} = await axios.delete(`${process.env.REACT_APP_API}/api/category/delete-category/${pId}`)
//       if(data.success){
//         toast.success(`Category is Deleted`);
//         getAllCategory();

//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error("Something Went Wrong")
//     }
//   }

//   // For Create  Products
//   const [productModel, setProductModel] = useState(false);
//   // Product Details
//   const [photo, setPhoto] = useState("");
//   const [name, setName] = useState("");
//   const [desc, setDesc] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [shipping, setShipping] = useState("");
//   const [category, setCategory] = useState("");
  
//   const createProduct = async(e) =>{
//     e.preventDefault()
//     try {
//       const productData = new FormData()
//       productData.append("name", name)
//       productData.append("desc", desc)
//       productData.append("price", price)
//       productData.append("quantity", quantity)
//       productData.append("photo", photo)
//       productData.append("category", category)
//       productData.append("shipping", shipping)
//       const {data} = await axios.post(`${process.env.REACT_APP_API}/api/products/create-product`, productData)

//       if(data.success){
//         toast.success(data.message)
//         setProductModel(false)
//         getAllProducts();
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong while adding product")
//     }

//   }


// // Get All Products
// // const [products, setProducts] = useState([]);
// //   const getAllProducts = async () =>{
// //     try {
// //       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/products/get-product`)
// //       setProducts(data.products);
// //     } catch (error) {
// //       console.log(error);
// //       toast.error("Something Went Wrong while adding product")
// //     }
// //   }

//   // Edit Product
//   const [editProductModel, seteditProductModel] = useState(false);
//   // For Edit Product
//   const[eproductId, setEProductId] = useState("");
//   const [ephoto, setEPhoto] = useState("");
//   const [ename, setEName] = useState("");
//   const [edesc, setEDesc] = useState("");
//   const [eprice, setEPrice] = useState("");
//   const [equantity, setEQuantity] = useState("");
//   const [eshipping, setEShipping] = useState();
//   const [ecategory, setECategory] = useState("");

//   // Edit Product
//   const getSingleProduct = async (pId) =>{

//       await axios.get(`${process.env.REACT_APP_API}/api/products/get-product/${pId}`).then((res)=>{
//         // setEProductId(res.data)
//         setEProductId(res.data.product._id)
//         setEName(res.data.product.name);
//         setEDesc(res.data.product.desc);
//         setEPrice(res.data.product.price)
//         setEQuantity(res.data.product.quantity);
//         setEShipping(res.data.product.shipping);
//         setECategory(res.data.product.category.name);
//         photo && setEPhoto(res.data.product.photo);
//         seteditProductModel(true);
//       }).catch((error)=>{
//         console.log(error);
//         toast.error("Something Went Wrong while getting Single product");
//         seteditProductModel(false)
//       }
//       )

// }


//   const clearAll = () =>{
//     setEName("");
//     setEDesc("");
//     setEPrice("")
//     setEQuantity("");
//     setEShipping("");
//     setECategory("");
//     setEPhoto("");
//   }
//   const handleUpdateProduct = async() =>{
//     // e.preventDefault();
//     try {
//       const productData = new FormData()
//       productData.append("name", ename)
//       productData.append("desc", edesc)
//       productData.append("price", eprice)
//       productData.append("quantity", equantity)
//       productData.append("photo", ephoto)
//       productData.append("category", ecategory)
//       productData.append("shipping", eshipping)
//       const {data} = await axios.put(`${process.env.REACT_APP_API}/api/products/update-product${eproductId}`, productData)

//       if(data.success){
//         toast.success(data.message)
//         seteditProductModel(false)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something Went Wrong while adding product")
//     }
//   }


//   // Delete Product
//   const handleDeleteProduct = async (pId)=>{
//     try {
//       let answer = window.confirm("Are you really want to delete this product ?");
//       if(!answer) return;
//       const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/products/delete-product/${pId}`);
//       toast.success("Delete Product Successfully")
//       getAllProducts();
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong while deleteing Product")
//     }
//   }


//   useEffect(() => {
//     getAllCategory();
//     getAllProducts();
//   }, []);
  
//   return (
//     <div className="dashboard-container">
//       <div className="row">
//         <AdminMenu />
//         <div className="col-md-9 py-1">
//           {showTabs == 1 && (
//             <div className="dashboard-box">
//               <div className="dashboard-header">
//                 <h3>{`Hello ${auth.user.name}`}</h3>
//               </div>
//             </div>
//           )}

//           {showTabs == 2 && (
//             <div className="dashboard-box">
//               <div className="dashboard-header">
//                 <div className="row">
//                   <div className="col-md-6">
//                   <h3>Manage Category</h3>
//                   </div>
//                   <div className="col-md-6 d-flex justify-content-end">
//                     <button className="btn-custom-green add-btn" onClick={()=>{setCategoryModel(true);}}><i className="fa-solid fa-plus mx-1"></i>Add</button>
//                   </div>
//                 </div>
          
//               </div>
//               <div className="dashboard-body">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">Name</th>
//                       <th scope="col">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {categories?.map((c) => (
//                       <>
//                         <tr>
//                           <td key={c._id}>{c.name}</td>
//                           <td>
//                             <button className="btn btn-primary" onClick={()=>{setUpdateCategoryModel(true); setUpdateName(c.name); setSelected(c)}}>Edit</button>
//                             <button className="btn btn-danger mx-2" onClick={()=>{handleDelete(c._id)}}>Delete</button>
//                           </td>
//                         </tr>
//                       </>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {showTabs == 3 && (
//             <div className="dashboard-box">
//                  <div className="dashboard-header">
//                 <div className="row">
//                   <div className="col-md-6">
//                   <h3>Manage Products</h3>
//                   </div>
//                   <div className="col-md-6 d-flex justify-content-end">
//                     {/* Confition for showing buttons  */}
//                     {(productModel == true || editProductModel == true) ? <button className="btn-custom-green add-btn" onClick={()=>{setProductModel(false); seteditProductModel(false); clearAll() }}><i className="fa-solid fa-angle-left"></i> Back</button> : <button className="btn-custom-green add-btn" onClick={()=>{setProductModel(true);}}><i className="fa-solid fa-plus mx-1"></i>Add</button>  }
//                   </div>
//                 </div>
//               </div>
//               <div className="dashboard-body">
//                 {miniLoading == true && <MiniLoader/>}
//                 {productModel == true && 
//                  <AddProduct categories={categories} createProduct={createProduct} 
//                  setCategory={setCategory} name={name} setName={setName} setPhoto={setPhoto}
//                   photo={photo} desc={desc} setDesc={setDesc} price={price} setPrice={setPrice}
//                    quantity={quantity} setQuantity={setQuantity} setShipping={setShipping}   />}
               
//                 {productModel == false &&  editProductModel == false  && <div className="row">
//                 {products?.map((p)=>(
//                 <Product key={p._id} name={p.name} defaultimg={`${process.env.REACT_APP_API}/api/products/product-photo/${p._id}`} price={p.price} 
//                 category={p.category.name} pid={p._id} seteditProductModel= {seteditProductModel}  editclick={getSingleProduct}  handleDeleteProduct={handleDeleteProduct} />
//                 ))}
//               </div>}
                

//             {editProductModel == true && 
//             <EditProduct categories={categories} createProduct={createProduct} 
//             setCategory={setCategory} name={ename} setName={setEName} setPhoto={setEPhoto}
//              photo={ephoto} desc={edesc} setDesc={setEDesc} price={eprice} setPrice={setEPrice}
//               quantity={equantity} setQuantity={setEQuantity} Eshipping={eshipping} setShipping={setShipping} Ecategory={ecategory} editProductModel={editProductModel} eproductId={eproductId} handleUpdateProduct={handleUpdateProduct}/>}
//               </div>
//             </div>
//           )}
//         </div>

            
//             <Modal onCancel={()=>{setCategoryModel(false)}} footer={null} open={categoryModel}>
//               <Categoryform handleSubmit = {handleSubmit} value={categoryname} setValue={setCategoryname}/>
//             </Modal>

//             <Modal onCancel={()=>{setUpdateCategoryModel(false)}} footer={null} open={updateCategoryModel}>
//               <Categoryform value={updatedName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
//             </Modal>

//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
