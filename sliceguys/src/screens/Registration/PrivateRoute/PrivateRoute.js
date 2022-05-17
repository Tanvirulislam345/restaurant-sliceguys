import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../Context/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (loading) {
		return (
			<CircularProgress
				style={{ width: "100%", display: "flex", justifyContent: "center" }}
			/>
		);
	} else if (!loading && user.email) {
		return children;
	}
	return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
