import React from "react";
import "./SideCart.css";
import useAuth from "../../Context/useAuth";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

function Cart() {
  const { cartItem } = useAuth();

  const totalPrice = cartItem.reduce(
    (total, prd) => total + prd?.totalQuantityPrice,
    0
  );

  return (
    <div className="Sidecart">
      <div className="cartHeader">
        <p>My Cart</p>
      </div>
      <div className="ContainerCart">
        {cartItem.length > 0 ? (
          cartItem.map((item, index) => <CartItem key={index} item={item} index={index} />)
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            No Product added yet
          </p>
        )}
      </div>

      {cartItem.length > 0 ? (
        <CheckOut totalPrice={totalPrice}></CheckOut>
      ) : (
        " "
      )}
    </div>
  );
}

export default Cart;
