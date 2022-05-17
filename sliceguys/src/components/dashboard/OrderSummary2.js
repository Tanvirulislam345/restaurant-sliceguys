import { Box, Button, Card, CardHeader } from "@mui/material";
import React, { useState } from "react";
import LastDay from "./LastDay";
import Monthly from "./Monthly";
import Weekly from "./Weekly";

const OrderSummary2 = () => {
	const [currentNav, setCurrentNav] = useState("last Week");

	return (
		<Card>
			<CardHeader sx={{ py: 2 }} title="Revenue Summary" />
			<Box
				sx={{ mx: 2, px: 1 }}
				style={{
					maxWidth: "280px",
					backgroundColor: "#EAEDFC",
					borderRadius: "3px",
				}}
			>
				<Button
					style={{
						color: currentNav === "last Month" && "black",
						backgroundColor: currentNav === "last Month" && "white",
						padding: currentNav === "last Month" && "2px 16px",
					}}
					onClick={() => setCurrentNav("last Month")}
				>
					last Month
				</Button>
				<Button
					style={{
						color: currentNav === "last Week" && "black",
						backgroundColor: currentNav === "last Week" && "white",
						padding: currentNav === "last Week" && "2px 16px",
					}}
					onClick={() => setCurrentNav("last Week")}
				>
					last Week
				</Button>
				<Button
					style={{
						color: currentNav === "last day" && "black",
						backgroundColor: currentNav === "last day" && "white",
						padding: currentNav === "last day" && "2px 16px",
					}}
					onClick={() => setCurrentNav("last day")}
				>
					last day
				</Button>
			</Box>
			{currentNav == "last Month" && <Monthly></Monthly>}
			{currentNav == "last Week" && <Weekly></Weekly>}
			{currentNav == "last day" && <LastDay></LastDay>}
		</Card>
	);
};

export default OrderSummary2;
