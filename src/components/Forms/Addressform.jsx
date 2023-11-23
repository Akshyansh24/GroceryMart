import React from 'react'

function Addressform({name, setName, apartment,
    setApartment, area, setArea, mobile,
    setMobile, landmark, setLandmark, city, setCity,
    state, setState, pincode, setpincode, defaultaddress, setdefaultaddress, Actionbtn, addressFind}) {
  return (
    <form onSubmit={Actionbtn} action="">
    <input
      className="form-control mb-3"
      type="name"
      name="name"
      value={name}
      placeholder="Name"
      onChange={(event)=>{setName(event.target.value)}}
    />
    <input
      className="form-control mb-3"
      type="text"
      name="apartment"
      value={apartment}
      placeholder="Apartment"
      onChange={(event)=>{setApartment(event.target.value)}}

    />
    <input
      className="form-control mb-3"
      type="text"
      name="area"
      value={area}
      placeholder="Area"
      onChange={(event)=>{setArea(event.target.value)}}

    />
    <input
      className="form-control mb-3"
      type="number"
      name="mobile"
      value={mobile}
      placeholder="Mobile Number"
      onChange={(event)=>{setMobile(event.target.value)}}

    />
    <input
      className="form-control mb-3"
      type="text"
      name="landmark"
      value={landmark}
      placeholder="Landmark"
      onChange={(event)=>{setLandmark(event.target.value)}}

    />
    <input
   className="form-control mb-3"
   type="number"
   name="Pincode"
   value={pincode}
   placeholder="Pincode"
   onChange={(event)=>{setpincode(event.target.value); addressFind(event.target.value);}}
 />
    <input
      className="form-control mb-3"
      type="text"
      name="City"
      placeholder="City"
      value={city}
    />
    <input
      className="form-control mb-3"
      type="text"
      name="State"
      placeholder="State"
      value={state}
    />
    <select name="defaultaddress" className="form-select mb-3" id="" value={defaultaddress} onChange={(event)=>{setdefaultaddress(event.target.value)}} >
        <option >Make this address default ?</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
    </select>
    <button className='btn btn-primary' value={"Submit"}>Submit</button>
  </form>
  )
}

export default Addressform