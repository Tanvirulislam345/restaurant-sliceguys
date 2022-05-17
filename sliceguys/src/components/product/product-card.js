import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card } from "@mui/material";
import Radio from "@mui/material/Radio";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, deleteFuction }) => {
	const [selectedValue, setSelectedValue] = useState();

	const priceTopinsdis =
		selectedValue === "s"
			? product.regularDiscount
			: selectedValue === "m"
			? product.mediumDiscount
			: selectedValue === "l"
			? product.largeDiscount
			: product.regularDiscount;

	const priceDiscount = parseInt(priceTopinsdis);

	return (
		<Card>
			<div style={{ padding: "10px" }} className="item">
				<div className="img">
					<img src={`data:image/*;base64, ${product.file}`} alt="" />
				</div>

				<div className="details">
					<div className="price">
						<b>£ {priceDiscount}</b>
					</div>
					<div className="title" style={{ marginTop: "5px" }}>
						<b>{product.title}</b>
					</div>

					<div className="top">
						<div className="size" style={{ margin: "10px 0px" }}>
							{product?.mediumPrice && (
								<div className="s">
									<Radio
										checked={selectedValue === "s" && true}
										onClick={() => setSelectedValue("s")}
										sx={{
											color: "black",
											paddingRight: "10px",
											"&.Mui-checked": {
												color: "black",
											},
										}}
									/>
									<p>S</p>
								</div>
							)}
							{product?.mediumPrice && (
								<div className="s">
									<Radio
										checked={selectedValue === "m" && true}
										onClick={() => setSelectedValue("m")}
										sx={{
											color: "black",
											paddingRight: "10px",
											"&.Mui-checked": {
												color: "black",
											},
										}}
									/>
									<p>M</p>
								</div>
							)}
							{product?.largePrice && (
								<div className="s">
									<Radio
										checked={selectedValue === "l" && true}
										onClick={() => setSelectedValue("l")}
										sx={{
											color: "black",
											paddingRight: "10px",
											"&.Mui-checked": {
												color: "black",
											},
										}}
									/>
									<p>L</p>
								</div>
							)}
						</div>
					</div>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<Link
							to={`/products/${product._id}`}
							style={{ textDecoration: "none", color: "black" }}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<EditIcon />
								<small>Edit</small>
							</Box>
						</Link>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
							onClick={() => deleteFuction(product._id)}
						>
							<DeleteSweepIcon />
							<small>Delete</small>
						</Box>
					</Box>
				</div>
			</div>
		</Card>
	);
};
