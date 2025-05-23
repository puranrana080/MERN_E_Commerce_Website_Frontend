import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const url = "http://localhost:3000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData,setFilteredData]=useState([])

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      setProducts(api.data.products);
      setFilteredData(api.data.products)
    };
    fetchProduct();
  }, [token]);
  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };
  //login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      }
    );
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    console.log(api.data);
    setToken(api.data.token);
    localStorage.setItem('token',api.data.token)
    setIsAuthenticated(true);
    return api.data;
  };

  //logout User
  const logout = ()=>{
    setIsAuthenticated(false)
    setToken("")
    localStorage.removeItem('token')
     toast.success("Logged Out Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        isAuthenticated,
        setIsAuthenticated,
        filteredData,setFilteredData,logout
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
