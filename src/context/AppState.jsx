import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";

const AppState = (props) => {
  const url = "http://localhost:3000/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: { "Content-Type": "Application/json" },
        withCredentials: true,
      });
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
  }, [token, reload]);

  useEffect(() => {
    let lsToken = localStorage.getItem("token");
    if (lsToken) {
      setToken(lsToken);
      setIsAuthenticated(true);
    }
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
    localStorage.setItem("token", api.data.token);
    setIsAuthenticated(true);
    return api.data;
  };

  //logout User
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
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
  };

  //user profile
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });
    console.log(api.data);
    setUser(api.data.user);
  };

  //add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: { "Content-Type": "Application/json", Auth: token },
        withCredentials: true,
      }
    );
    setReload(!reload);
    console.log("mycart", api);
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
  };

  //get User cart
  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });
    // console.log("user cart",api.data.cart);
    // setUser("user cart",api.data.user);
    setCart(api.data.cart);
  };

  //decrease  --qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: { "Content-Type": "Application/json", Auth: token },
        withCredentials: true,
      }
    );

    setReload(!reload);
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
  };
  //remove item from cart
  const removeFromCart = async (productId) => {
    const api = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });

    setReload(!reload);
    // console.log("remove item", api.data);
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
  };

  //rclear Cart
  const clearCart = async () => {
    const api = await axios.delete(`${url}/cart/clear`, {
      headers: { "Content-Type": "Application/json", Auth: token },
      withCredentials: true,
    });

    setReload(!reload);
    // console.log("remove item", api.data);
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
  };

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
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
