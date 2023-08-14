import React from "react";
import {Select} from "antd"
const {Option} = Select
function Productfrom({createProduct, setCategory, categories, photo, setPhoto, name ,setName ,desc ,setDesc, price, setPrice ,quantity,setQuantity, shipping, setShipping, Eshipping, Ecategory, editProductModel, eproductId, handleUpdateProduct}) {

  let editshipping = null
  if(Eshipping == true){
    editshipping = 1
  }else if(Eshipping == false){
    editshipping = 0
  }else{
    editshipping = null
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
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
                </div>
                <div className="col-md-6">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product-photo"
                      height={"100px"}
                      className="img img-responsive"
                    />
                  </div>
            ) : (
              <div className="text-center">
                {eproductId ? (<img
                  src={`${process.env.REACT_APP_API}/api/products/product-photo/${eproductId}`}
                  alt="Update-photo"
                  height={"100px"}
                  className="img img-responsive"
                />):("Upload Photo")}
                
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
            <input
              type="text"
              name=""
              value={desc}
              placeholder="Product Desc"
              className="form-control"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="Number"
              name=""
              value={price}
              placeholder="Product Price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
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
            <select
              name="shipping"
              placeholder="Select Shipping"
              className="form-select"
              onChange={(e) => setShipping(e.target.value)}
              // value={ editshipping !== null ? (editshipping) : (shipping)}
              // value={ Eshipping ? (editshipping) : ""}
              value={editshipping}
            >
              <option defaultValue={null} selected>Select Shipping</option>
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
