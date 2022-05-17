import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import CustomerMenu from "./customer-menu";

export const CustomerListResults = ({ alldata, handleUpdate }) => {
	return (
		<Paper elevation={3} sx={{ p: 1 }}>
			<TableContainer sx={{ backgroundColor: "#E5E5E5", color: "white" }}>
				<Table aria-label="spanning table">
					<TableHead>
						<TableRow>
							<TableCell sx={{ color: "#F2D7D5" }}>Order Id</TableCell>
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
							<TableCell
								align="center"
								sx={{ color: "#F2D7D5" }}
							></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{alldata ? (
							alldata?.reverse().map((order) => (
								<TableRow key={order._id} order={order}>
									<TableCell>{order._id}</TableCell>
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
									<TableCell align="center">
										<CustomerMenu
											order_id={order._id}
											handleUpdate={handleUpdate}
										/>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableCell>loadding...</TableCell>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
