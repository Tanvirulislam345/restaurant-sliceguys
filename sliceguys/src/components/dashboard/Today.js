import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Today = () => {
	const [alldatas, setAlldatas] = useState([]);

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/buy-product")
			.then((res) => res.json())
			.then((data) => setAlldatas(data));
	}, []);
	const todayDate = new Date();
	const dateToday = moment(todayDate).format("L");

	const newOrders = alldatas.filter((data) => data.date === dateToday);
	const approved = alldatas.filter(
		(data) => data.date === dateToday && data.status === "Approved Order"
	);
	const delivered = alldatas.filter(
		(data) => data.date === dateToday && data.status === "Delivered Order"
	);
	const cancel = alldatas.filter(
		(data) => data.date === dateToday && data.status === "Canceled Order"
	);

	return (
		<Box sx={{ p: 2 }}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Card
						sx={{
							border: "1px solid gray",
							p: 1,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Button
								style={{
									backgroundColor: "#14B8A6",
									fontWeight: "bold",
									fontSize: "26px",
									marginRight: "10px",
									color: "white",
									padding: "1px 40px",
								}}
							>
								{newOrders.length}
							</Button>

							<Typography
								color="textSecondary"
								gutterBottom
								variant="h6"
							>
								Total Orders
							</Typography>
						</Box>
						<Link to="/neworders" style={{ textDecoration: "none" }}>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									color="textSecondary"
									gutterBottom
									variant="h6"
									style={{ color: "#704CDD", marginBottom: "3px" }}
								>
									Manage Orders
								</Typography>
								<KeyboardArrowDownIcon
									style={{
										transform: "rotate(270deg)",
										color: "#704CDD",
									}}
								/>
							</Box>
						</Link>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card sx={{ border: "1px solid gray", padding: "10px" }}>
						<Typography color="textPrimary" variant="h4">
							{approved.length}
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Approved
						</Typography>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card sx={{ border: "1px solid gray", padding: "10px" }}>
						<Typography color="textPrimary" variant="h4">
							{delivered.length}
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Delivered
						</Typography>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card sx={{ border: "1px solid gray", padding: "10px" }}>
						<Typography color="textPrimary" variant="h4">
							{cancel.length}
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Canceled
						</Typography>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Today;
