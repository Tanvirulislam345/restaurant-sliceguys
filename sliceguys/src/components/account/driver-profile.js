import {
    Avatar,
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import image1 from '../../assets/avater/avatar_7.png';

const user = {
    avatar: image1,
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Jonh Smith',
    timezone: 'GTM-7',
    phone: '+1 123 456 7890',
    address: '1623 E Updahl Ct, Harrison, ID, 83833'
};

export const DriverProfile = (props) => (
    <Card {...props}>
        <CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'flex-start'
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 64,
                        width: 64,
                        mr: 3
                    }}
                />
                <Box>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h6"
                    >
                        {user.name}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="subtitle2"
                    >
                        Driver
                    </Typography>
                </Box>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Box>
                <Box sx={{
                    display: 'flex',
                    my: 1
                }}>
                    <AddIcCallIcon sx={{ mx: 2 }} />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                    >
                        {user.phone}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex'
                }}>
                    <AccountBalanceIcon sx={{ mx: 2 }} />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                    >
                        {user.address}
                    </Typography>
                </Box>
            </Box>
        </CardActions>
    </Card>
);
