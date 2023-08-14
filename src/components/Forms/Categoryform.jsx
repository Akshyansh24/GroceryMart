import React from "react";

function Categoryform({handleSubmit, value, setValue}) {
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter New Category"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Categoryform;
