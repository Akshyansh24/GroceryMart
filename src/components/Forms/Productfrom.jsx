import React, { useContext } from "react";
import {Select} from "antd"
import { Context } from "../../utils/context";
const {Option} = Select

function Productfrom({createProduct, setCategory, categories, mainPhoto, setMainPhoto, hoverPhoto, setHoverPhoto, name ,setName ,desc ,setDesc, price, setPrice ,quantity,setQuantity, stock, setstock, Estock, Ecategory, editProductModel, eproductId, handleUpdateProduct, salername, setSalername , discount, setDiscount}) {
  const {auth} = useContext(Context)
  let editstock = null
  if(Estock == true){
    editstock = 1
  }else if(Estock == false){
    editstock = 0
  }else{
    editstock = null
  }

  return (
    <div>
      <form action="">
        <div >
          <Select
            bordered={false}
            size="large"
            placeholder="Select a Category"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setCategory(value);
            }}
            value={Ecategory}
            
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="col-md-12 p-0">
           <div className="border rounded p-2">
           <div className="row">
                <div className="col-md-6 text-center d-flex">
                <label className="btn btn-outline-secondary d-flex " style={{height:"100px",alignItems:"center"}}>
              {mainPhoto ? mainPhoto.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setMainPhoto(e.target.files[0])}
                hidden
              />
            </label>
                </div>
                <div className="col-md-6 d-flex text-center" style={{justifyContent:"center", alignItems:"center"}}>
                {mainPhoto ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(mainPhoto)}
                      alt="product-photo"
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
            ) : (
              <div className="text-center">
                {eproductId ? (<img
                  src={`${process.env.REACT_APP_API}/api/products/product-mainphoto/${eproductId}`}
                  alt="Update-photo"
                  height={"100px"}
                  className="img img-responsive"
                />):("Upload Front Photo")}
                
              </div>
            )}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6 text-center d-flex">
                <label className="btn btn-outline-secondary d-flex " style={{height:"100px",alignItems:"center"}}>
              {hoverPhoto ? hoverPhoto.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setHoverPhoto(e.target.files[0])}
                hidden
              />
            </label>
                </div>
                <div className="col-md-6 d-flex text-center" style={{justifyContent:"center", alignItems:"center"}}>
                {hoverPhoto ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(hoverPhoto)}
                      alt="product-photo"
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
            ) : (
              <div className="text-center">
                {eproductId ? (<img
                  src={`${process.env.REACT_APP_API}/api/products/product-hoverphoto/${eproductId}`}
                  alt="Update-photo"
                  height={"100px"}
                  className="img img-responsive"
                />):("Upload Back Photo")}
                
              </div>
            )}
                </div>
            </div>
           </div>
          </div>

          <div className="mb-3">
            
          </div>

          <div className="mb-3">
            <input
              type="text"
              name=""
              value={name}
              placeholder="Product Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="mb-3">
            <textarea className="form-control" value={desc} onChange={(e)=>setDesc(e.target.value)} name="desc" placeholder="Description" id="" cols="100" rows="4"/>
            {/* <input
              type="text"
              name=""
              value={desc}
              placeholder="Product Desc"
              className="form-control"
              onChange={(e) => setDesc(e.target.value)}
            /> */}
          </div>
          <div className="mb-3">
            <input
              type="Number"
              name=""
              value={price}
              placeholder="Product Price"
              className="form-control"
              min="0"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="Number"
              name=""
              value={discount}
              placeholder="Product Discount"
              className="form-control"
              min="0" max="99"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="Number"
              name=""
              value={quantity}
              placeholder="Product Quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name=""
              value={salername}
              placeholder="Saler Name"
              className="form-control"
              disabled
            />
          </div>
          <div className="mb-3">
            <select
              name="stock"
              placeholder="Select stock"
              className="form-select"
              onChange={(e) => setstock(e.target.value)}
              // value={ editstock !== null ? (editstock) : (stock)}
              // value={ Estock ? (editstock) : ""}
              value={editstock}
            >
              <option defaultValue={null} selected>Select stock</option>
              <option value="0"> No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div className="mb-3">
            {editProductModel == true ? 
            <button className="btn btn-primary" onClick={handleUpdateProduct}>{" "}Update Product
            </button> 
            :
            <button className="btn btn-primary" onClick={createProduct}>{" "}Create Product
            </button> }
          </div>
        </div>
      </form>
    </div>
  );
}

export default Productfrom;
