import {
  Box,
  Button,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';


export const ProductListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Products
      </Typography>

      <Box sx={{ m: 1 }}>
        <Link to="/productforms"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Button
            color="secondary"
            sx={{ backgroundColor: '#222831' }}
            variant="contained"
          >
            Add products
          </Button>
        </Link>
      </Box>
    </Box>
  </Box>
);
