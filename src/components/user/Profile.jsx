import React, { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../ShowOrderProduct";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  console.log("Profile", userOrder);

  return (
    <>
      <div className="container text-center my-5">
        <h1>Welcome, {user?.name}</h1>
        <h3>{user?.email}</h3>
        <h1 className="mt-3">Total Orders:- {userOrder?.length}</h1>
      </div>
      {userOrder?.length > 0 && (
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
              {userOrder?.map((order) => (
                <tr key={order._id}>
                  <td className="bg-dark text-light">
                    <ShowOrderProduct items={order?.orderItems} />
                  </td>
                  <td className="bg-dark text-light">
                    <ul style={{ fontWeight: "bold" }}>
                      <li>OrderId : {order?.orderId}</li>
                      <li>PaymentId : {order?.paymentId}</li>
                      <li>PaymentStatus : {order?.payStatus}</li>
                      <li>Name : {order?.userShipping?.fullName}</li>
                      <li>Phone : {order?.userShipping?.phoneNumber} </li>
                      <li>Country : {order?.userShipping?.country}</li>
                      <li>State : {order?.userShipping?.state}</li>
                      <li>Pincode : {order?.userShipping?.pincode}</li>
                      <li>Near By : {order?.userShipping?.address}</li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Profile;
