import { Box, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import useAuth from "../Context/useAuth";

const TodaysOrderList = () => {
	const [alldatas, setAlldatas] = useState([]);
	const { setStatus, status } = useAuth();

	const handleUpdate = (value, id) => {
		const statusChange = {
			status: value,
		};

		const url = `https://restaurantsliceguys.sliceguys.co.uk/update-sell-products/${id}`;
		axios.put(url, statusChange).then((res) => {
			if (res.data.modifiedCount > 0) {
				setStatus(!status);
			}
		});
	};

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/buy-product")
			.then((res) => res.json())
			.then((data) => setAlldatas(data));
	}, [status]);

	const alldata = alldatas
		.reverse()
		.filter((data) => data.status === "Pending Order");

	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 3,
			}}
		>
			<Container maxWidth={false}>
				<CustomerListToolbar />
				<Box sx={{ py: 2 }}>
					<CustomerListResults
						alldata={alldata}
						handleUpdate={handleUpdate}
					/>
				</Box>
			</Container>
		</Box>
	);
};

TodaysOrderList.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TodaysOrderList;
