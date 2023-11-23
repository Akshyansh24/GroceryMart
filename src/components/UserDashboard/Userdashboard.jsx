import { React, useContext, useState, useEffect } from "react";
import "../AdminDashboard/AdminDashboard.css";
import { Context } from "../../utils/context";
import UserMenu from "./UserMenu";
import axios from "axios";
import { toast } from "react-toastify";
import UserOrders from "./UserOrders";
import {Link} from "react-router-dom"
import UserNewAddress from "./UserNewAddress";

function Userdashboard(props) {
  const { auth, setAuth, showTabs } = useContext(Context);
  const [updateProfile, setUpdateProfile] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [password, setPassword] = useState("");

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    await axios
      .put(`${process.env.REACT_APP_API}/api/auth/update-profile`, {
        name,
        email,
        phone,
        address,
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          setAuth({ ...auth, user: res?.data.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = res?.data.updatedUser;
          console.log(ls);
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
          setUpdateProfile(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong while updating");
      });

    // try {
    //   const { data } = axios.put(
    //     `${process.env.REACT_APP_API}/api/auth/update-profile`,
    //     { name, email, phone, address }
    //   );
    //   if(data?.res.success){
    //     console.log(res.res.success);
    //   }
    //   if(res.error){
    //     toast.error(res.error);
    //   }else{
    //     // setAuth({...auth, user:data?.updatedUser});
    //     // let ls = localStorage.getItem('auth')
    //     // ls = JSON.parse(ls)
    //     // ls.user = data?.updatedUser;
    //     // console.log(ls);
    //     // // localStorage.setItem('auth', JSON.stringify(ls));
    //     toast.success('Profile Updated Successfully')
    //     console.log(res.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error("Something went wrong while updating");
    // }
  };

  const getUserData = () => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  };
  // useEffect(() => {
  //   if(auth?.token){
  //     getOrders();
  //   }
  // }, []);

  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/orders`
      );
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };



  // console.log(orders);

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

  // ////////////////////////////////////// For Address ///////////////////////////////////////
  const [showAddAddress , setShowAddAddress] = useState(false);
  // For Address for particular user
  const [getAddress, setGetAddress] = useState([])
  const getAddresses = async() =>{
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/get-address`
      );
      setGetAddress(data.address)
    } catch (error) {
      console.log(error);
    }
  }

  // For Delete Address
  const deleteAddress = async(id)=>{
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/auth/delete-address/${id}`
      );
      toast.success("Address delete successfully");
      getAddresses();
      getdefaultaddress();
    } catch (error) {
      console.log(error);
    }
  }


  const [defaultaddress, setdefaultaddress] = useState([]);
  const getdefaultaddress = async() =>{
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/default-address`
      );
      setdefaultaddress(data.address);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders();
    getUserData();
    getAddresses();
    getdefaultaddress();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="row">
        <UserMenu />
        <div className="col-md-9 py-1">
          {showTabs == 1 && (
            <div className="dashboard-box">
              <div className="dashboard-header">
                {/* <h3>{`Hello ${auth.user.name}`}</h3> */}
              </div>
            </div>
          )}

          {showTabs == 2 && (
            <div className="dashboard-box">
              <div className="dashboard-header">
                <div className="row">
                  <div className="col-md-6">
                    <h3>Manage Profile</h3>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">
                    {updateProfile === true ? (
                      <button
                        className="btn-custom-green add-btn"
                        onClick={() => {
                          setUpdateProfile(false);
                        }}
                      >
                        <i className="fa-solid fa-angle-left"></i> Back
                      </button>
                    ) : (
                      <button
                        className="btn-custom-green edit-btn"
                        onClick={() => {
                          setUpdateProfile(true);
                        }}
                      >
                        <i className="fa-solid fa-pen-to-square mx-1"></i>Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="dashboard-body">
                <form
                  className="mt-4"
                  onSubmit={handleUpdateProfile}
                  method="post"
                >
                  <input
                    className="form-control mb-3"
                    type="name"
                    value={name}
                    name="name"
                    placeholder="Name"
                    disabled={updateProfile === false ? "disabled" : ""}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <input
                    className="form-control mb-3"
                    type="email"
                    value={email}
                    name="email"
                    placeholder="Email"
                    disabled
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <input
                    className="form-control mb-3"
                    type="number"
                    value={phone}
                    name="phone"
                    placeholder="Phone"
                    disabled={updateProfile === false ? "disabled" : ""}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={address}
                    name="address"
                    placeholder="Address"
                    disabled={updateProfile === false ? "disabled" : ""}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                  {/* <input
                    className="form-control mb-3"
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Password"
                    disabled= {updateProfile === false ? "disabled" : ""}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  /> */}
                  {updateProfile === true && (
                    // <input type="submit" value="Submit" />
                    <button
                      type="submit"
                      value={"Submit"}
                      className="btn btn-primary"
                    >
                      {" "}
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          )}

          {showTabs == 3 && (
            <div className="dashboard-box">
              <div className="dashboard-header">
                <div className="row">
                  <div className="col-md-6">
                    <h3>Your Orders</h3>
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
                        <tr key={o._id}>
                          <td>{1 + i}</td>
                          <td>{o.status}</td>
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
                      {orders.length === 0 && <tr>
                        <td colSpan="12">No Orders</td>
                      </tr>}
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
                              src={`${process.env.REACT_APP_API}/api/products/product-mainphoto/${p._id}`}
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

          {showTabs == 4 && (
            <div className="dashboard-box">
              <div className="dashboard-header">
                <div className="row">
                  <div className="col-md-6">
                    <h3>Manage Address</h3>
                  </div>
                   <div className="col-md-6 d-flex justify-content-end">
                    {showAddAddress === true && <button
                        className="btn-custom-green add-btn"
                        onClick={() => {
                          setShowAddAddress(false);
                        }}
                      >
                        <i className="fa-solid fa-angle-left"></i> Back
                    </button>}
                  </div>
                </div>
              </div>
              <div className="dashboard-body">
                {showAddAddress === true && <UserNewAddress setShowAddAddress={setShowAddAddress} getdefaultaddress={getdefaultaddress} getAddresses={getAddresses}/>}
                 {showAddAddress === false && <div className="row ">
                    <div className="col-md-4 mt-4">
                      <div className="add-address-box" onClick={()=>{setShowAddAddress(true)}}>
                          <div className="add-address-inner-box" >
                          <i className="fa-solid fa-plus"></i>
                          <h3>Add</h3>
                          </div>
                      </div>
                    </div>
                    {defaultaddress.map((a)=>(
                      <div key={a._id} className="col-md-4 mt-4">
                      <div className="address-box">
                            <div className="address-box-header">
                                <p className="mb-0">Default Address</p>
                            </div>
                          <div className="address-inner-box">
                            <p>{a.name}</p>
                            <p>{a.apartment}</p>
                            <p>{a.area}</p>
                            <p>{a.city} <span>{a.state}</span> <span>{a.pincode}</span></p>
                            <p>india</p>
                            <p>phone number : <span>{a.mobile}</span></p>
                          </div>
                          <div className="address-footer">
                            <span><Link>Edit</Link></span> | <span onClick={()=>{deleteAddress(a._id)}}>Remove</span>
                          </div>
                      </div>
                    </div>
                    ))}
                    {getAddress.map((a)=>(
                      <div key={a._id} className="col-md-4 mt-4">
                      <div className="address-box">
                          <div className="address-inner-box normal-address">
                            <p>{a.name}</p>
                            <p>{a.apartment}</p>
                            <p>{a.area}</p>
                            <p>{a.city} <span>{a.state}</span> <span>{a.pincode}</span></p>
                            <p>india</p>
                            <p>phone number : <span>{a.mobile}</span></p>
                          </div>
                          <div className="address-footer">
                            <span><Link>Edit</Link></span> | <span onClick={()=>{deleteAddress(a._id)}}>Remove</span>
                          </div>
                      </div>
                    </div>
                    ))}
                    <div className="col-md-4 mt-4">
                      <div className="address-box">
                          <div className="address-inner-box">
                            <p>name</p>
                            <p>apartment</p>
                            <p>area</p>
                            <p>city <span>state</span> <span>pincode</span></p>
                            <p>india</p>
                            <p>phone number : <span>8505070521</span></p>
                          </div>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
