import React, { useContext, useState } from "react";
import Searchicon from "../../../assets/Header/search.png";
import "../Search/Search.css";
import { Context } from "../../../utils/context";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function Search() {
  const [showSearchResult, setShowSearchResult] = useState(false);
  const { searchProduct, setSearchProduct } = useContext(Context);

  const [searchProd, setSearchProd] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (value) => {
    let inputSearch = value;
    setSearchProd(inputSearch);
    fetchProduct();
    if(value.length == 0){
      setShowSearchResult(false);
    }
  };


  const fetchProduct = async () => {
    try {
      let {data} = await axios.get(
        `${process.env.REACT_APP_API}/api/products/search/${searchProd}`
      );
      setSearchProduct(data.result);
      setShowSearchResult(true)
    } catch (error) {
      console.log(error);
    }
  };
 


  return (
    <div>
      <div className="searchbar">
        <span>
          Search
          <i className="fa-solid fa-angle-right"></i>
        </span>
        <input
          type="search"
          name=""
          id=""
          value={searchProd}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onFocus={() => {
            setShowSearchResult(true);
          }}

       
          // onPointerLeave={() => {
          //   setShowSearchResult(false);
          // }}

        />
        {showSearchResult === false && <img className="searchicon" src={Searchicon} alt="" />}
      </div>

      {showSearchResult === true && (
        <div className="search-result-content">
          <div className="search-results">
            {searchProduct.map((p)=>(
            <div className="search-result-item" key={p._id} onClick={()=>{navigate(`/product/${p._id}`)}}>
            <div className="img-container">
              <img src={`${process.env.REACT_APP_API}/api/products/product-mainphoto/${p._id}`} alt="" />
            </div>
            <div className="search-prod-detail">
              <span className="name">{p.name}</span>
              <span className="desc">{p.desc}</span>
            </div>
          </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
