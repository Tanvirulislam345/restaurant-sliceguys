import MoneyIcon from "@mui/icons-material/Money";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const TotalMenu = () => {
	const [alldatas, setAlldatas] = useState([]);

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allcategori")
			.then((res) => res.json())
			.then((data) => setAlldatas(data));
	}, []);

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
							TOTAL MENU
						</Typography>
						<Typography color="textPrimary" variant="h4">
							{alldatas ? alldatas.length : 0}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: "primary.main",
								height: 56,
								width: 56,
							}}
						>
							<MoneyIcon />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TotalMenu;
