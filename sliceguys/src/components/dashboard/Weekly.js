import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Weekly = () => {
	const [alldatas, setAlldatas] = useState([]);
	const array1 = [];
	const array2 = [];
	const array3 = [];

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/buy-product")
			.then((res) => res.json())
			.then((data) => setAlldatas(data));
	}, []);

	const todayDate = new Date();
	const startDayOfPrevWeek = moment(todayDate)
		.subtract(1, "week")
		.startOf("week")
		.format("L");
	const lastDayOfPrevWeek = moment(todayDate)
		.subtract(1, "week")
		.endOf("week")
		.format("L");

	const weekly = alldatas.filter((all) => {
		const launchDate = all.date;
		return moment(launchDate).isBetween(
			startDayOfPrevWeek,
			lastDayOfPrevWeek
		);
	});
	weekly.map((order) => {
		const data = order.items.reduce(
			(total, prd) => total + prd?.totalQuantityPrice,
			0
		);
		array1.push(data);
	});
	const value = array1.reduce((total, current) => total + current, 0);

	const weekly2 = weekly.filter((data) => data.paymentType === "Card");
	weekly2.map((order) => {
		const data = order.items.reduce(
			(total, prd) => total + prd?.totalQuantityPrice,
			0
		);
		array2.push(data);
	});
	const value2 = array2.reduce((total, current) => total + current, 0);

	const weekly3 = weekly.filter((data) => data.paymentType === "Cash");
	weekly3.map((order) => {
		const data = order.items.reduce(
			(total, prd) => total + prd?.totalQuantityPrice,
			0
		);
		array3.push(data);
	});
	const value3 = array3.reduce((total, current) => total + current, 0);

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
								{weekly?.length}
							</Button>

							<Typography
								color="textSecondary"
								gutterBottom
								variant="h6"
							>
								Total Orders
							</Typography>
						</Box>
						<Link to="/lastweekorders" style={{ textDecoration: "none" }}>
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
							{value}
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Total sale
						</Typography>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card sx={{ border: "1px solid gray", padding: "10px" }}>
						<Typography color="textPrimary" variant="h4">
							{value2}
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Card
						</Typography>
					</Card>
				</Grid>
				<Grid item xs={4}>
					<Card sx={{ border: "1px solid gray", padding: "10px" }}>
						<Typography color="textPrimary" variant="h4">
							{value3}
						</Typography>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Cash
						</Typography>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Weekly;
