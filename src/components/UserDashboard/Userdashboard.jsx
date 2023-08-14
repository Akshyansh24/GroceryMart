import { React, useContext, useState, useEffect } from "react";
import "../AdminDashboard/AdminDashboard.css";
import { Context } from "../../utils/context";
import UserMenu from "./UserMenu";
import axios from "axios";
import { toast } from "react-toastify";

function Userdashboard() {
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
        if(res.data.error){
            toast.error(res.data.error)
        }else{
        setAuth({...auth, user:res?.data.updatedUser});
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls.user = res?.data.updatedUser;
        console.log(ls);
        localStorage.setItem('auth', JSON.stringify(ls));
        toast.success('Profile Updated Successfully')
        setUpdateProfile(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong while updating");
      });

    // try {
      // const { data } = axios.put(
      //   `${process.env.REACT_APP_API}/api/auth/update-profile`,
      //   { name, email, phone, address }
      // );
      // if(data?.res.success){
      //   console.log(res.res.success);
      // }
      // if(res.error){
      //   toast.error(res.error);
      // }else{
      //   // setAuth({...auth, user:data?.updatedUser});
      //   // let ls = localStorage.getItem('auth')
      //   // ls = JSON.parse(ls)
      //   // ls.user = data?.updatedUser;
      //   // console.log(ls);
      //   // // localStorage.setItem('auth', JSON.stringify(ls));
      //   toast.success('Profile Updated Successfully')
      //   console.log(res.message);
      // }
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
  useEffect(() => {
    getUserData();
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
                    <button type="submit" value={"Submit"} className="btn btn-primary"> Submit</button>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Userdashboard;
