import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import axios from "axios";
import React, { useState } from "react";
import useAuth from "../../Context/useAuth";
import Ingreadients from "./Ingreadients";

function Products({ ProductsD }) {
	return (
		<div className="product">
			<Grid container spacing={2}>
				{ProductsD.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</Grid>
		</div>
	);
}

function Product({ product }) {
	const { user } = useAuth();
	const [selectedValue, setSelectedValue] = React.useState("s");
	const [selected, setSelected] = useState();

	const handleFavourites = (id) => {
		if (user.email === undefined) {
			alert("Please signin or registe");
		} else {
			const data = {
				id,
				email: user.email,
			};
			setSelected(id);
			axios
				.post(
					"https://restaurantsliceguys.sliceguys.co.uk/favouritelist",
					data
				)
				.then((res) => {
					if (res.data.insertedId) {
					}
				});
		}
	};

	const priceTopinsdis =
		selectedValue === "s"
			? product.regularDiscount
			: selectedValue === "m"
			? product.mediumDiscount
			: selectedValue === "l"
			? product.largeDiscount
			: product.regularDiscount;

	const priceDiscount = parseInt(priceTopinsdis);

	const updatedProduct = {
		...product,
		price: priceDiscount,
		size: selectedValue,
		quantity: 1,
		totalQuantityPrice: priceDiscount,
	};

	return (
		<Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
			<div style={{ padding: "10px" }} className="item">
				<div className="img">
					<img src={`data:image/*;base64, ${product.file}`} alt="" />
				</div>

				<div className="details">
					<div className="price">
						<b>£ {priceDiscount}</b>
						<div>
							<FavoriteIcon
								onClick={() => handleFavourites(product._id)}
								className="buttonId"
								sx={{
									color: selected === product._id && "yellow",
									mb: 1,
									cursor: "pointer",
								}}
							/>
						</div>
					</div>
					<div className="title">
						<b>{product.title}</b>
					</div>
					<p className="description">{product.description}</p>
					<div className="top">
						<div className="size">
							{(product?.mediumDiscount || product?.largeDiscount) && (
								<div className="s">
									<Radio
										checked={selectedValue === "s" && true}
										onClick={() => setSelectedValue("s")}
										sx={{
											color: "#8f9d9f",
											paddingRight: "10px",
											"&.Mui-checked": {
												color: "#ffe500",
											},
										}}
									/>
									<p>S</p>
								</div>
							)}
							{product?.mediumDiscount && (
								<div className="s">
									<Radio
										checked={selectedValue === "m" && true}
										onClick={() => setSelectedValue("m")}
										sx={{
											color: "#8f9d9f",
											paddingRight: "10px",
											"&.Mui-checked": {
												color: "#ffe500",
											},
										}}
									/>
									<p>M</p>
								</div>
							)}
							{product.largeDiscount && (
								<div className="s">
									<Radio
										checked={selectedValue === "l" && true}
										onClick={() => setSelectedValue("l")}
										sx={{
											color: "#8f9d9f",
											paddingRight: "10px",
											"&.Mui-checked": {
												color: "#ffe500",
											},
										}}
									/>
									<p>L</p>
								</div>
							)}
						</div>
					</div>
					<Ingreadients updatedProduct={updatedProduct}></Ingreadients>
				</div>
			</div>
		</Grid>
	);
}
export default Products;
