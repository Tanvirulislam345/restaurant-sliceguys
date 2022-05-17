
import { Link, NavLink } from "react-router-dom";

import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const active = false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <Link
        to={href}
        style={{ diplay: 'block', width: '100%', textDecoration: 'none' }}
      >
        <Button
          component="button"
          startIcon={icon}
          disableRipple
          sx={{
            backgroundColor: active && '#DADEDE',
            borderRadius: 1,
            color: active ? 'black' : 'neutral.700',
            fontWeight: active && 'fontWeightBold',
            justifyContent: 'flex-start',
            px: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            '& .MuiButton-startIcon': {
              color: active ? '#2C3E50' : 'neutral.500'
            },
            '&:hover': {
              backgroundColor: '#DADEDE',
              color: 'black'
            }
          }}
        >
          <Box sx={{ flexGrow: 1, fontSize: 'medium' }}>
            {title}
          </Box>
        </Button>
      </Link>
    </ListItem>
  );
};
