import { Grid } from "@mui/material";
import React from "react";
import "./Cart.css";
import Cart from "../../components/Cart/Cart";

const AddAllCart = () => {

  return (

    <Grid container className="cartHole">
      <Grid xs={12} sm={10} md={6} lg={4}>
        <Cart></Cart>
      </Grid>
    </Grid>
  );
};

export default AddAllCart;
