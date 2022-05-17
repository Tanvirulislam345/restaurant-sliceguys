import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import { ProductCard } from "../components/product/product-card";
import { ProductListToolbar } from "../components/product/product-list-toolbar";

const FilterProducts = () => {
	const { categoriName } = useParams();
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/products/${categoriName}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 3,
			}}
		>
			<Container maxWidth={false}>
				<ProductListToolbar />
				<Box sx={{ pt: 3 }}>
					<Grid container spacing={3}>
						{products.length > 0 ? (
							products.map((product) => (
								<Grid
									item
									lg={3}
									md={3}
									sm={4}
									xs={6}
									key={product._id}
								>
									<ProductCard product={product} />
								</Grid>
							))
						) : (
							<Box
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<CircularProgress />
							</Box>
						)}
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};

FilterProducts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default FilterProducts;
