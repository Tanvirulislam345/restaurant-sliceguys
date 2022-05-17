import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../Context/useAuth";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Loadding from "../loading/Loadding";
import Products from "../Products/Products";

function Menu() {
	const { ProductsDatas, setProductsDatas } = useAuth();
	const [alldata, setAlldata] = useState([]);
	const [isActiveCat, setIsActiveCat] = useState("All");

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allcategori")
			.then((res) => res.json())
			.then((data) => setAlldata(data));
	}, []);

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allproduts")
			.then((res) => res.json())
			.then((data) => setProductsDatas(data));
	}, []);

	const ProductsD =
		isActiveCat === "All"
			? ProductsDatas
			: ProductsDatas.filter((product) => product.category === isActiveCat);

	return (
		<div className="menu">
			<div className="container" style={{ padding: "20px 0px" }}>
				<Banner />
				<Category
					setIsActiveCat={setIsActiveCat}
					isActiveCat={isActiveCat}
					alldata={alldata}
				/>
				{ProductsD.length > 0 ? (
					<Products ProductsD={ProductsD} />
				) : (
					<Box
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							paddingTop: "20px",
						}}
					>
						<Loadding></Loadding>
					</Box>
				)}
			</div>
		</div>
	);
}

export default Menu;
