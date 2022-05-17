import React from "react";
import Grid from "@mui/material/Grid";
import Navbar from "../Navbar/Navbar";
import MenuHeader from "../MenuHeader/MenuHeader";

function Layout({ children }) {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={0} sm={0} md={1} lg={1} xl={1} className="hello">
          <Navbar />
        </Grid>

        <Grid item xs={12} sm={12} md={11} lg={11} xl={11} style={{ padding: " 0px " }}>
          <MenuHeader />
          <div className="mainpage">
            <div style={{ height: "100%" }}>
              {children}
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Layout;
