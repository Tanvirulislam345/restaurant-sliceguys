import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import "../Favourite/favourite.css";

function Notification() {
	const { user, status, noti, setNoti } = useAuth();

	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/my-product/${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setNoti(data));
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
						{noti?.length > 0 ? (
							noti?.reverse().map((order) => (
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

export default Notification;
