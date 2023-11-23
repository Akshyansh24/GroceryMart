import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Header from "../src/components/Header/Header"
import AppContext from './utils/context';
import Home from "../src/components/Home/Home"
import Contact from './components/Contact/Contact';
import Category from './components/Category/Category';
import Newletter from './components/Home/Newletter/Newletter';
import Features from './components/Home/Features/Features';
import SingleProduct from "./components/SingleProduct/SingleProduct"
import Login from './components/Login/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from './components/Success/Success';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute'
import Userdashboard from './components/UserDashboard/Userdashboard';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import CartPage from './components/Cart/CartPage';
function App() {
  return (
      <div>
             
              <BrowserRouter>
                <AppContext>
                <ToastContainer />
                  <Header/>
                  <Routes>
                      <Route>
                        <Route path="/" element ={<Home/>}/>  
                        <Route path="/contact" element ={<Contact/>}/>  
                        <Route path="/category/:id" element ={<Category/>}/>  
                        <Route path="/product/:pid" element ={<SingleProduct/>}/>  
                        <Route path="/login" element ={<Login/>}/>  
                        <Route path="/cartpage" element ={<CartPage/>}/>  
                        <Route path="/dashboard" element ={<PrivateRoute/>}>
                           <Route path="user" element ={<Userdashboard/>}/> 
                        </Route> 
                        <Route path="/dashboard" element ={<AdminRoute/>}>
                           <Route path="admin" element ={<AdminDashboard/>}/> 
                        </Route> 
                        <Route path="/success" element={<Success/>}/>
                          
                      </Route>
                  </Routes>
                  <Newletter/>
                 <Features/>
                </AppContext>
              </BrowserRouter>
      </div>
  );
}

export default App;
