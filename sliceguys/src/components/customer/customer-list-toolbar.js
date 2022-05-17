import {
  Box, Typography
} from '@mui/material';

export const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Order List
      </Typography>
    </Box>
  </Box>
);
