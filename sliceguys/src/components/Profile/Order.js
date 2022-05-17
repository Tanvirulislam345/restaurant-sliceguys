import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import "../../screens/Favourite/favourite.css";

function OrderComp() {
	const { user, status } = useAuth();
	console.log(status);
	const [alldata, setAlldata] = useState([]);

	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/my-product-history/${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setAlldata(data));
	}, [user.email, status]);

	return (
		<Paper elevation={3} sx={{ p: 1 }}>
			<TableContainer sx={{ backgroundColor: "#E5E5E5", color: "white" }}>
				<Table aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ color: "#F2D7D5" }}>Date</TableCell>
							<TableCell sx={{ color: "#F2D7D5" }}>Time</TableCell>
							<TableCell sx={{ color: "#F2D7D5" }}>Email</TableCell>
							<TableCell align="center" sx={{ color: "#F2D7D5" }}>
								Quantity
							</TableCell>
							<TableCell align="center" sx={{ color: "#F2D7D5" }}>
								Total Price
							</TableCell>
							<TableCell sx={{ color: "#F2D7D5" }}>Status</TableCell>
							<TableCell sx={{ color: "#F2D7D5" }}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{alldata.length > 0 ? (
							alldata.map((order) => (
								<TableRow key={order._id} order={order}>
									<TableCell>{order.date}</TableCell>
									<TableCell>{order.time}</TableCell>
									<TableCell>{order.email}</TableCell>
									<TableCell align="center">
										{order.items.reduce(
											(total, prd) => total + prd?.quantity,
											0
										)}
									</TableCell>
									<TableCell align="center">
										£{" "}
										{order.items.reduce(
											(total, prd) =>
												total + prd?.totalQuantityPrice,
											0
										)}
									</TableCell>
									<TableCell>{order.status}</TableCell>
									<TableCell>
										<Link
											to={`/orders/${order._id}`}
											style={{
												textDecoration: "none",
												color: "blue",
											}}
										>
											View
										</Link>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell sx={{ color: "black" }}>
									No Product buy
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}

export default OrderComp;
