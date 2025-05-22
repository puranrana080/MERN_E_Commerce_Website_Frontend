import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = (props) => {
  const url = "http://localhost:3000/api";

  const [products,setProducts]=useState([])



  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      setProducts(api.data.products)
    };
    fetchProduct();
  }, []);
  return (
    <AppContext.Provider value={{ products }}>{props.children}</AppContext.Provider>
  );
};

export default AppState;
