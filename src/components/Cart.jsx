import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const Cart = () => {
  const { cart, decreaseQty, addToCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setQty(qty);
    setPrice(price);
  }, [cart]);
  return (
    <>
      <div className="my-5 text-center">
        <button
          className="btn btn-info mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Qty:- {qty}
        </button>
        <button
          className="btn btn-warning mx-3"
          style={{ fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total Price:- {price}
        </button>
      </div>
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-dark my-5 text-center"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt="img"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_des">
              <h2>{product.title}</h2>
              <h4>{product.price}</h4>
              <h4>Qty:- {product.qty}</h4>
            </div>
            <div className="cart_action">
              <button
                onClick={() => decreaseQty(product?.productId, 1)}
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
              >
                Qty--
              </button>
              <button
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
              >
                Qty++
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Cart;
