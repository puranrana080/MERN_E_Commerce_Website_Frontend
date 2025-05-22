import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const Navbar = () => {
  const [searchTerm,setSearchTerm]=useState("")
  const navigate= useNavigate()

  const submitHandler=(e)=>{
    e.preventDefault()
    navigate(`/product/search/${searchTerm}`)
    setSearchTerm("")


  }
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E-Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="search product.."/>
          </form>
          <div className="right">
            <button className="btn btn-warning mx-3">Cart</button>
            <button className="btn btn-warning mx-3">Profile</button>
            <button className="btn btn-warning mx-3">Login</button>
            <button className="btn btn-warning mx-3">Register</button>
            <button className="btn btn-warning mx-3">Logout</button>
          </div>
        </div>
        <div className="sub_bar"></div>
      </div>
    </>
  );
};

export default Navbar;
