import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import OrderComp from "../../components/Profile/Order";
import ProfileComp from "../../components/Profile/Profile";
import ProfileNav from "../../components/Profile/ProfileNav";

import "./Profile.css";

function Profile() {
  const [currentNav, setCurrentNav] = React.useState("My Profile");
 
  return (
    <div className="mainsection">
      <h3 className="favTitle">Profile</h3>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={3}>
          <ProfileNav currentNav={currentNav} setCurrentNav={setCurrentNav} />
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
        {currentNav === "My Profile" && <ProfileComp />}
          {currentNav === "My Order" && <OrderComp />}
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
