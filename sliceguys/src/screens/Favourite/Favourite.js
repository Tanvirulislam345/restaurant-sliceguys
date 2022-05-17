import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cart from "../../components/Cart/Cart";
import Ingreadients from "../../components/Products/Ingreadients";
import useAuth from "../../Context/useAuth";
import "./favourite.css";

function Favourite() {
	const { user, ProductsDatas, addToCart } = useAuth();
	const [favdata, setFavData] = useState([]);
	const [removeState, setRemoveState] = useState(false);

	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/favouritelist/${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setFavData(data));
	}, [user.email, removeState]);

	const data = ProductsDatas?.filter((value) => {
		return favdata.find((da) => {
			return da.id === value._id ? 1 : 0;
		});
	});

	const handleRemove = (id) => {
		const proced = window.confirm("Are you want to Remove from favourite ?");
		if (proced) {
			axios
				.delete(
					`https://restaurantsliceguys.sliceguys.co.uk/favouritelist/${id}`
				)
				.then((res) => {
					if (res.data.deletedCount > 0) {
						setRemoveState(!removeState);
					}
				});
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
				<div className="favourite">
					<h1 className="favTitle">My Favourites</h1>
					<Grid container spacing={2}>
						{data
							? data.map((product) => (
									<Product
										key={product._id}
										addToCart={addToCart}
										product={product}
										handleRemove={handleRemove}
									/>
							  ))
							: ""}
					</Grid>
				</div>
			</Grid>
			<Grid
				item
				xl={3}
				lg={3}
				md={4}
				sm={0}
				xs={0}
				sx={{ padding: "0px" }}
				className="sideCartItemNone"
			>
				<Cart />
			</Grid>
		</Grid>
	);
}

function Product({ product, addToCart, handleRemove }) {
	const [selectedValue, setSelectedValue] = React.useState("s");

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
		<Grid item xl={3} lg={4} md={3} sm={6} xs={12}>
			<div style={{ padding: "10px" }} className="item">
				<div className="img">
					<img src={`data:image/*;base64, ${product.file}`} alt="" />
				</div>

				<div className="details">
					<div className="price">
						<b>£ {priceDiscount}</b>
						<div>
							<RemoveCircleIcon
								onClick={() => handleRemove(product._id)}
								sx={{ mb: 1, cursor: "pointer", color: "#ffe500" }}
							/>
						</div>
					</div>
					<div className="title">
						<b>{product.title}</b>
					</div>
					<p style={{ marginBottom: "0px", marginTop: "2px" }}>
						{product.description}
					</p>
					<div className="top">
						<div className="size">
							{(product?.mediumPrice || product?.largePrice) && (
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
							{product?.mediumPrice && (
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
							{product.largePrice && (
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

export default Favourite;
