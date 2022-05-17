import { Box, Container } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import useAuth from "../Context/useAuth";

const LastWeekOrderList = () => {
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

	const todayDate = new Date();
	const startDayOfPrevWeek = moment(todayDate)
		.subtract(1, "week")
		.startOf("week")
		.format("L");
	const lastDayOfPrevWeek = moment(todayDate)
		.subtract(1, "week")
		.endOf("week")
		.format("L");

	const alldata = alldatas.filter((all) => {
		const launchDate = all.date;
		return moment(launchDate).isBetween(
			startDayOfPrevWeek,
			lastDayOfPrevWeek
		);
	});

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

LastWeekOrderList.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);

export default LastWeekOrderList;
