import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const { shippingAddress, userAddress } = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    alert(formData);
    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
    if (result.success) {
      navigate("/checkout");
    }
  };
  return (
    <>
      <div
        className="container my-3 p-4"
        style={{
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping Address </h1>
        <form className="my-3" onSubmit={submitHandler}>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputName1" className="form-label">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputName1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputCountry1" className="form-label">
                Country
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputCountry1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputState1" className="form-label">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputState1"
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputCity1" className="form-label">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                type="text"
                className="form-control bg-dark text-light"
                id="exampleInputCity1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPincode1" className="form-label">
                Pincode
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHandler}
                type="number"
                className="form-control bg-dark text-light"
                id="exampleInputPincode1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputTel1" className="form-label">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHandler}
                type="tel"
                className="form-control bg-dark text-light"
                id="exampleInputTel1"
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 ">
              <label htmlFor="exampleInputTel1" className="form-label">
                Address/Nearby
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={onChangeHandler}
                type="textarea"
                className="form-control bg-dark text-light"
                id="exampleInputTel1"
              />
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button
              type="submit"
              style={{ fontWeight: "bold" }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
        {userAddress && (
          <div className="d-grid col-6 mx-auto my-3">
            <button
              className="btn btn-warning"
              style={{ fontWeight: "bold" }}
              onClick={() => navigate("/checkout")}
            >
              Use Old Address
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
