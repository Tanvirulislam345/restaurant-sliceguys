import AddLocationIcon from "@mui/icons-material/AddLocation";
import EmailIcon from "@mui/icons-material/Email";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import {
	Avatar,
	Box,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// import CircularProgress from "@mui/material/CircularProgress";

export const AccountProfile = ({ id }) => {
	const [address, setAddress] = useState({});

	useEffect(() => {
		fetch(
			`https://restaurantsliceguys.sliceguys.co.uk/address-collection/${id}`
		)
			.then((res) => res.json())
			.then((data) => setAddress(data));
	}, [id]);

	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						display: "flex",
						justifyContent: "start",
						alignItems: "flex-start",
					}}
				>
					<Avatar
						src="/static/images/avatars/avatar_6.png"
						sx={{
							height: 64,
							width: 64,
							mr: 3,
						}}
					/>
					<Box>
						<Typography color="textPrimary" gutterBottom variant="h6">
							{address.firstname}
						</Typography>
						<Typography
							color="textPrimary"
							gutterBottom
							variant="subtitle2"
						>
							Customers
						</Typography>
					</Box>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Box>
					<Box
						sx={{
							display: "flex",
						}}
					>
						<EmailIcon sx={{ mx: 2 }} />
						<Typography color="textPrimary" gutterBottom>
							{address.Email}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
						}}
					>
						<PhoneForwardedIcon sx={{ mx: 2, my: "4px" }} />
						<Typography color="textPrimary" gutterBottom>
							{address.phone}
						</Typography>
					</Box>

					<Box
						sx={{
							display: "flex",
						}}
					>
						<AddLocationIcon sx={{ mx: 2 }} />
						<Typography color="textPrimary" gutterBottom>
							{address.address} {address.address2}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
						}}
					>
						<PendingActionsIcon sx={{ mx: 2 }} />
						<Typography color="textPrimary" gutterBottom>
							{address.postcode}
						</Typography>
					</Box>
				</Box>
			</CardActions>
		</Card>
	);
};
