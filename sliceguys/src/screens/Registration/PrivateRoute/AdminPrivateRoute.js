import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../Context/useAuth';

const AdminPrivateRoute = ({ children, ...rest }) => {
    const { user, adminData, loading2 } = useAuth();
    const location = useLocation();

    if (loading2) {
        return  <CircularProgress
        style={{width: '100%', display: 'flex', justifyContent: 'center'}}
        />
    } else if (!loading2 && user.email && adminData) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />;
};

export default AdminPrivateRoute;