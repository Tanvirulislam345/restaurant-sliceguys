import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";

const TodaysCardSell = () => {
	const [alldata, setAlldata] = useState([]);
	const array1 = [];

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/buy-product")
			.then((res) => res.json())
			.then((data) => setAlldata(data));
	}, []);

	const todayDate = new Date();
	const dateToday = moment(todayDate).format("L");

	alldata.map((order) => {
		const data =
			order.date === dateToday &&
			order.paymentType === "Card" &&
			order.items.reduce((total, prd) => total + prd?.totalQuantityPrice, 0);
		array1.push(data);
	});

	const value = array1.reduce((total, current) => total + current, 0);

	return (
		<Card>
			<CardContent>
				<Grid
					container
					spacing={3}
					sx={{ justifyContent: "space-between" }}
				>
					<Grid item>
						<Typography
							color="textSecondary"
							gutterBottom
							variant="overline"
						>
							Today Card
						</Typography>
						<Typography color="textPrimary" variant="h4">
							£ {value}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: "danger.main",
								height: 56,
								width: 56,
							}}
						>
							<AttachMoneyIcon />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TodaysCardSell;
