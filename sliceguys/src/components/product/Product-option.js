import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ProductOption({ product, ...rest }) {
    // console.log(product)

    const deleteFunction = () => {
        console.log('Delete product')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Typography
                onClick={handleClick}
                size="small"
                id="dothover"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ display: 'flex', justifyContent: 'end', p: 1 }}
                variant="h5"
            >
                ...
            </Typography>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        // mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <MenuItem>
                        Edit
                    </MenuItem>
                </Link>
                <MenuItem onClick={() => deleteFunction()}>
                    Delete
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}