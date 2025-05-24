import React, { useState, useEffect } from "react";

const ShowOrderProduct = ({ items }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setQty(qty);
    setPrice(price);
  }, [items]);

  return (
    <>
      <table className="table table-bordered border-primary bg-dark text-center">
        <thead>
          <tr>
            <th className="bg-dark text-light" scope="col">
              Product Img
            </th>
            <th className="bg-dark text-light" scope="col">
              Title
            </th>
            <th className="bg-dark text-light" scope="col">
              Price
            </th>
            <th className="bg-dark text-light" scope="col">
              Qty
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
            <tr key={product._id}>
              <th className="bg-dark text-light" scope="row">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                  alt=""
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              {/* <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  do_not_disturb_on
                </span>
              </td>
              <td className="bg-dark text-light">
                {
                  <span
                    className="material-symbols-outlined"
                    onClick={() =>
                      addToCart(
                        product?.productId,
                        product.title,
                        product.price / product.qty,
                        1,
                        product.imgSrc
                      )
                    }
                  >
                    add_circle
                  </span>
                }
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    if (confirm("Are you sure, want to remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  delete
                </span>
              </td> */}
            </tr>
          ))}
          <tr>
            <th className="bg-dark text-light" scope="row"></th>
            <td className="bg-dark text-light">
              <button className="btn btn-primary">Total</button>{" "}
            </td>
            <td className="bg-dark text-light">
              {" "}
              <button className="btn btn-warning">{price}</button>{" "}
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info">{qty}</button>{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ShowOrderProduct;
