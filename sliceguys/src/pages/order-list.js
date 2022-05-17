import { Box, Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import useAuth from "../Context/useAuth";

const Customers = () => {
	const [alldata, setAlldata] = useState([]);
	const { status, setStatus } = useAuth();

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
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
