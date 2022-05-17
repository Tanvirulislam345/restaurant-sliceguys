import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function Loadding() {
  return (
 
    <Grid container spacing={1}>
       <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
      <Skeleton
        sx={{ bgcolor: 'grey.400', height:'200px', width: '100%' }}
        variant="rectangular"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
      <Skeleton
        sx={{ bgcolor: 'grey.400', height:'200px', width: '100%' }}
        variant="rectangular"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
      <Skeleton
        sx={{ bgcolor: 'grey.400', height:'200px', width: '100%' }}
        variant="rectangular"
      />
      </Grid>
       <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
      <Skeleton
        sx={{ bgcolor: 'grey.400', height:'200px', width: '100%' }}
        variant="rectangular"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
      <Skeleton
        sx={{ bgcolor: 'grey.400', height:'200px', width: '100%' }}
        variant="rectangular"
      />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={3} >
      <Skeleton
        sx={{ bgcolor: 'grey.400', height:'200px', width: '100%' }}
        variant="rectangular"
      />
      </Grid>
    </Grid>
  );
}
