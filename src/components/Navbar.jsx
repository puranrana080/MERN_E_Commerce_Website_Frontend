import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated } =
    useContext(AppContext);
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat?.toLowerCase()
      )
    );
  };
  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };
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
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search product.."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <button className="btn btn-warning mx-3">Cart</button>
                <Link to={"/profile"} className="btn btn-primary mx-3">Profile</Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterByCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterByCategory("Laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterByCategory("cameras")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterByCategory("Headphones")}
            >
              Headphones
            </div>
            <div className="items" onClick={() => filterByPrice(10000)}>
              10,000
            </div>
            <div className="items" onClick={() => filterByPrice(14990)}>
              14990
            </div>
            <div className="items" onClick={() => filterByPrice(19990)}>
              19990
            </div>
            <div className="items" onClick={() => filterByPrice(30000)}>
              30000
            </div>
            <div className="items" onClick={() => filterByPrice(59000)}>
              5900
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
