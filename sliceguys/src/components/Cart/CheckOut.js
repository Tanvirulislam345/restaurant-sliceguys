import React from "react";
import { NavLink } from "react-router-dom";

const CheckOut = ({totalPrice}) => {

  return (
        <div className="priceDiv">
          <hr />
          <div className="price">
            <b>Total Price</b>
            <b style={{padding: "0px 15px"}}>£ {totalPrice}</b>
          </div>

          <div className="checkoutButton">
            <NavLink to="/payment">
              <button>Checkout</button>
            </NavLink>
          </div>
        </div>
  );
};

export default CheckOut;
