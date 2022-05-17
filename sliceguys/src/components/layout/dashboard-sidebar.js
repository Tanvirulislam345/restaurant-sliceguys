import { Box, Drawer, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import HouseIcon from '@mui/icons-material/House';
import { Users as UsersIcon } from '../icons/users';
import MoneyIcon from '@mui/icons-material/Money';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { NavItem } from './nav-item';


const items = [
  {
    href: '/',
    icon: (<HouseIcon fontSize="small" />),
    title: 'Home'
  },
  {
    href: '/dashboard',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/customers',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Order List'
  },
  {
    href: '/categories',
    icon: (<MoneyIcon fontSize="small" />),
    title: 'Categories'
  },
  {
    href: '/products',
    icon: (<ShoppingBagIcon fontSize="small" />),
    title: 'Products'
  },
  {
    href: '/makeadmin',
    icon: (<PersonAddAltIcon fontSize="small" />),
    title: 'Make Admin'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });


  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          pt: 10,
          backgroundColor: '#FFFFFF'
        }}
      >

        <Box sx={{
          flexGrow: 1
        }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        {/* <Divider sx={{ borderColor: '#2D3748' }} /> */}

      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280,
            border: 'none'
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
