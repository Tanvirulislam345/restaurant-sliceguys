import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import { ProductCard } from "../components/product/product-card";
import { ProductListToolbar } from "../components/product/product-list-toolbar";

const Products = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allproduts")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	const deleteFuction = (id) => {
		const proced = window.confirm("Are you want to delete this categories ?");
		if (proced) {
			const uri = `https://restaurantsliceguys.sliceguys.co.uk/allproduts/${id}`;
			console.log(uri);
			fetch(uri, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						alert("cancel your booking successfully");
						const remainingCategories = products.filter(
							(data) => data._id !== id
						);
						setProducts(remainingCategories);
					}
				});
		}
	};
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
									md={4}
									sm={6}
									xs={12}
									key={product._id}
								>
									<ProductCard
										product={product}
										deleteFuction={deleteFuction}
									/>
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

Products.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Products;
