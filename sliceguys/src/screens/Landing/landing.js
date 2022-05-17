import Cart from "../../components/Cart/Cart";
import Menu from "../../components/menu/Menu";

import { Grid } from "@mui/material";
import "./landing.css";

function Landing() {
  
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
        <Menu />
        </Grid>
        <Grid item xl={3} lg={3} md={4} sm={0} xs={0} sx={{ padding: "0px" }} className="sideCartItemNone">
          <Cart/>
        </Grid>
      </Grid>
    </div >
  );
}

export default Landing;
