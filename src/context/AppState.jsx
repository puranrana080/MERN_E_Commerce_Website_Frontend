import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const url = "http://localhost:3000/api";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      setProducts(api.data.products);
    };
    fetchProduct();
  }, []);
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
  return (
    <AppContext.Provider value={{ products, register }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
