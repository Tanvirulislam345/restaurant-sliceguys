import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import useAuth from "../Context/useAuth";

const Orders = () => {
	const { ordersId } = useParams();
	const [singleUser, setSingleUser] = useState(null);
	const { status } = useAuth();

	useEffect(() => {
		fetch(
			`https://restaurantsliceguys.sliceguys.co.uk/buy-product/${ordersId}`
		)
			.then((res) => res.json())
			.then((data) => setSingleUser(data));
	}, [ordersId, status]);

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 3,
			}}
			className="detailsBackground"
		>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item lg={4} md={4} sm={6} xs={12}>
						{singleUser && <AccountProfile id={singleUser.addressId} />}
					</Grid>
					<Grid item lg={8} md={8} sm={6} xs={12}>
						{singleUser && (
							<AccountProfileDetails allitem={singleUser.items} />
						)}
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
