import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Context/useAuth";

const TodaysOrders = () => {
	const [alldatas, setAlldatas] = useState([]);
	const { setStatus, status } = useAuth();

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/buy-product")
			.then((res) => res.json())
			.then((data) => setAlldatas(data));
	}, []);

	const current = new Date();
	const date = moment(current).format("L");
	const alldata = alldatas.filter((data) => data.status === "Pending Order");

	return (
		<Link to="/todaysorders" style={{ textDecoration: "none" }}>
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
								all Pandding
							</Typography>
							<Typography color="textPrimary" variant="h4">
								{alldata ? alldata.length : 0}
							</Typography>
						</Grid>
						<Grid item>
							<Avatar
								sx={{
									backgroundColor: "success.main",
									height: 56,
									width: 56,
								}}
							>
								<PeopleIcon />
							</Avatar>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Link>
	);
};

export default TodaysOrders;
