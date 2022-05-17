import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const TotalProducts = () => {
	const [alldatas, setAlldatas] = useState([]);

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allproduts")
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
							TOTAL Products
						</Typography>
						<Typography color="textPrimary" variant="h4">
							{alldatas ? alldatas.length : 0}
						</Typography>
					</Grid>
					<Grid item>
						<Avatar
							sx={{
								backgroundColor: "warning.main",
								height: 56,
								width: 56,
							}}
						>
							<InsertChartIcon />
						</Avatar>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default TotalProducts;
