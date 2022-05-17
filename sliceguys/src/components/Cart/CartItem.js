import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ImCross } from "react-icons/im";
import { Grid, Paper } from "@mui/material";
import useAuth from "../../Context/useAuth";

const CartItem = ({item, index}) => {
  // console.log(item.toopingNames)
  const { increaseItem, decreaseItem, removeCart } = useAuth();
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <div className="cartItem">
        <Grid container>
          <Grid item xs={1} className="cartItemQuentity">
            <KeyboardArrowDownIcon
              onClick={() => increaseItem(index)}
              style={{
                transform: "rotate(180deg)",
              }}
            />
            <span>{item?.quantity}</span>
            <KeyboardArrowDownIcon
              onClick={() => decreaseItem(index)}
            />
          </Grid>

          <Grid item xs={3} className="cartItemImage">
            <img src={`data:image/*;base64, ${item?.file}`} alt="" />
          </Grid>

          <Grid item xs={7} className="details" style={{ padding: "0px" }}>
            <h5>{item?.title}</h5>
            <small>£ {item?.totalQuantityPrice}</small>
          </Grid>
          <Grid item xs={1} className="toggle">
            <ImCross
              onClick={() => removeCart(index)}
              style={{ width: "10px" }}
            />
            <KeyboardArrowDownIcon
              onClick={() => setToggle(!toggle)}
              style={{
                transform: toggle ? "rotate(360deg)" : "rotate(180deg)",
              }}
            />
          </Grid>
        </Grid>
      </div>
      <div className="extraAdons" style={{ display: toggle && "none" }}>
      {
      item?.toopingNames ? <span>{item.toopingNames}</span>
      : <span>No Tooping Added</span>
      }
      </div>
    </div>
  );
};

export default CartItem;
