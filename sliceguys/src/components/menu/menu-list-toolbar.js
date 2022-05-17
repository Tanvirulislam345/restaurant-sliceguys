import {
    Box,
    Button,
    Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import CategorisMenu from './categoris-menu';

export const MenuListToolbar = (props) => (
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
                Categories List
            </Typography>
            <Box sx={{ m: 1 }}>
                <CategorisMenu></CategorisMenu>
            </Box>
        </Box>
    </Box>
);
