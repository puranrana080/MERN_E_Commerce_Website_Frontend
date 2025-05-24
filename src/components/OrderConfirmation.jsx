import React from "react";
import AppContext from "../context/AppContext";
import { useContext,useEffect } from "react";
import { useState } from "react";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConfirmation = () => {
    const {userOrder} =useContext(AppContext)
    const [latestOrder,setLatestOrder]=useState({})

    useEffect(()=>{
        if(userOrder){
            setLatestOrder(userOrder[0])
        }

    },[userOrder])

    console.log("Latest order",latestOrder)

  return <>
  <div className="container my-3">

    <h1 className="text-center">Your order has been confirmed</h1>
    <h3 className="text-center" >It will be delivered soon.</h3>
  </div>

   <div className="container ">
       

        <table className="table table-bordered border-primary bg-dark">
          <thead className="bg-dark">
            <tr>
              <th className="bg-dark text-light text-center" scope="col">
                Order Items
              </th>
              <th className="bg-dark text-light text-center" scope="col">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody className="bg-dark">
            <tr>
              <td className="bg-dark text-light">
               
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="bg-dark text-light">
                <ul style={{ fontWeight: "bold" }}>
                    <li>OrderId : {latestOrder?.orderId}</li>
                    <li>PaymentId : {latestOrder?.paymentId}</li>
                    <li>PaymentStatus : {latestOrder?.payStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.phoneNumber} </li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>
                  <li>Pincode : {latestOrder?.userShipping?.pincode}</li>
                  <li>Near By : {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="container text-center my-5">
        <button
          className="btn btn-secondary btn-lg"
          style={{ fontWeight: "bold" }}
         
        >
          Proceed To Pay
        </button>
      </div> */}
  </>;
};

export default OrderConfirmation;
