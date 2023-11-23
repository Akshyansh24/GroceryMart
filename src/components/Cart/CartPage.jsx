import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import CartPageItem from "./Cartitem/CartPageItem";
import { Context } from "../../utils/context";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItem, auth, setCartItem } = useContext(Context);
  const navigate = useNavigate()
  const totalPrice = () => {
    try {
      let total = 0;
      cartItem?.map((product) => {
        total = total + product.price * product.cartQuantity;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/products/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(false);
  const handlePayment = async() => {
    try {
        setLoading(true)
        const {nonce} = await instance.requestPaymentMethod()
        const {data} = await axios.post(`${process.env.REACT_APP_API}/api/products/braintree/payments`,{
            nonce,cartItem
        })
        // console.log(data);
        toast.success("Order Successfull")
        setCartItem([]);
        localStorage.removeItem('cart');
        navigate('/')
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const [showPaymentBox, setPaymentBox] = useState(false);

  return (
    <div className="card-box">
      <div className="row mt-3">
        <div className="col-md-8 mb-5">
          <div className="cart-heading">
            <h3>Your Cart</h3>
          </div>
          {cartItem.length > 0 && (
            <div className="cart-heading-text d-flex justify-content-between">
              <h6 className="mb-0 mt-1">{`there are ${cartItem.length}  products in your cart`}</h6>
              <span>
                <i className="fa-solid fa-trash"></i> Clear Cart
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <table className="shopping-table border">
            <thead>
              <tr>
                <th className="sr-no">#</th>
                <th colSpan={2}>Product</th>
                <th className="text-center" scope="col">
                  Unit Price
                </th>
                <th className="text-center" scope="col">
                  Quanity
                </th>
                <th className="text-center" scope="col">
                  Sub Total
                </th>
                <th className="text-center" scope="col">
                  Remove
                </th>
              </tr>
            </thead>
            <tbody>
                {cartItem.length > 0 ? (<CartPageItem />):(
              
              <tr>
                <td colSpan={12}>
                    <div className="my-5">
                    <h6 >Your cart is empty</h6>
                    </div>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="col-md-4">
          <div className="border shopping-total">
            {showPaymentBox === false ? (
              <div className="shopping-total-inner">
                <div className="sub-total border-bottom pt-2 pb-2">
                  <h6>Sub-Total</h6>
                  <h6>&#8377; {totalPrice()}</h6>
                </div>
                <div className="sub-total border-bottom pt-3 pb-3">
                  <h6>Shipping</h6>
                  <h6 className="text-dark">Free</h6>
                </div>
                <div className="sub-total pt-1 pb-1">
                  <hr />
                </div>
                <div className="sub-total border-bottom border-top pt-2 pb-2">
                  <h6>Total</h6>
                  <h6>&#8377; {totalPrice()}</h6>
                </div>

                {auth.user ? (<>
                    {cartItem.length > 0 ? (<button
                  className="btn-primary btn mt-2 mb-2 w-100"
                  onClick={() => {
                    setPaymentBox(true);
                  }}
                >
                  Make Payment
                </button>) :(<Link className="btn btn-primary btn mt-2 mb-2 w-100" to={'/'}>Return To Homepage</Link>) }
                </>): (<button
                  className="btn-primary btn mt-2 mb-2 w-100"
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Please Login
                </button>)}
                
              </div>
            ) : (
              <div className="cart-payment text-center">
                <DropIn
                  options={{
                    authorization: clientToken,
                    paypal: {
                      flow: "vault",
                    },
                    googlePay: {
                      flow: "vault",
                    },
                  }}
                  onInstance={(instance) => setInstance(instance)}
                />
              <div>

              </div>
              {loading === false ? (<> <button
                  className="btn btn-primary "
                  onClick={() => {
                    setPaymentBox(false);
                  }}
                >
                  Back
                </button>
                <button
                  className="btn btn-primary "
                  onClick={handlePayment}
                  disabled={!instance || !auth?.user?.address}
                >
                  Payment
                </button></>):(<h6>Processing</h6>) }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
