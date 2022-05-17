import { Box, Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserListToolbar from '../components/Users/UserListToolbar';

import UsersListResult from '../components/Users/UsersListResult';

const MakeAdmin = () => {
    const [alldata, setAlldata] = useState([]);
    const [status, setStatus] = useState(false);

    const handleUpdate = (id, data) => {
        const statusChange = {
            "role": data,
        };

        const url = `http://localhost:9000/makeadmin/${id}`;
        // const url = `https://restaurantsliceguys.sliceguys.co.uk/makeadmin/${id}${id}`;
        axios.put(url, statusChange).then((res) => {
            console.log(res)
            if (res.data.modifiedCount > 0) {
                setStatus(!status);
            }
        });
    };

    useEffect(() => {
        fetch("http://localhost:9000/makeadmin")
            // fetch("https://restaurantsliceguys.sliceguys.co.uk/makeadmin")
            .then((res) => res.json())
            .then((data) => setAlldata(data));
    }, [status]);
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 3,
            }}
        >
            <Container maxWidth={false}>
                <UserListToolbar />
                <Box sx={{ py: 2 }}>
                    <UsersListResult
                        alldata={alldata}
                        handleUpdate={handleUpdate}
                    />
                </Box>
            </Container>
        </Box>
    );
};

export default MakeAdmin;