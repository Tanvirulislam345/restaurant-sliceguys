import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const UserListToolbar = (props) => {
    return (
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
                    All Users
                </Typography>
            </Box>
        </Box>
    );
};

export default UserListToolbar;