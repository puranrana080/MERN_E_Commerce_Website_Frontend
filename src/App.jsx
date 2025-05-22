import React, { useContext } from "react";
import AppContext from "./context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/product/SearchProduct";

const App = () => {
  // const {data}=useContext(AppContext)
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="product/:id" element={<ProductDetail/>}  />
        <Route path="product/search/:term" element={<SearchProduct/>}  />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
