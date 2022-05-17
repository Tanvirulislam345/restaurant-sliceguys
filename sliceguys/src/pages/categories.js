import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Card, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "../components/layout/dashboard-layout";
import { MenuListToolbar } from "../components/menu/menu-list-toolbar";

const Categories = () => {
	const [alldata, setAlldata] = useState([]);
	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allcategori")
			.then((res) => res.json())
			.then((data) => setAlldata(data));
	}, []);

	const deleteFuction = (id) => {
		const proced = window.confirm("Are you want to delete this categories ?");
		if (proced) {
			const uri = `https://restaurantsliceguys.sliceguys.co.uk/allcategori/${id}`;
			console.log(uri);
			fetch(uri, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.deletedCount > 0) {
						alert("cancel your booking successfully");
						const remainingCategories = alldata.filter(
							(data) => data._id !== id
						);
						setAlldata(remainingCategories);
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
				<MenuListToolbar />
				<Box sx={{ pt: 3 }}>
					<Grid container spacing={3}>
						{alldata.map((product) => (
							<Grid item key={product._id} lg={3} md={3} sm={4} xs={6}>
								<Card>
									<Box sx={{ p: 3 }}>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
											}}
										>
											<img
												src={`data:image/*;base64, ${product.file}`}
												alt=""
												style={{
													height: "50px",
													width: "50px",
													borderRadius: "100%",
													objectFit: "cover",
												}}
											/>
										</Box>

										<Box sx={{ textAlign: "center", my: 2 }}>
											<b> {product.categoriName}</b>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Link
												to={`/allproduts/${product.categoriName}`}
												style={{
													textDecoration: "none",
													color: "black",
												}}
											>
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														justifyContent: "center",
														alignItems: "center",
													}}
												>
													<VisibilityIcon />
													<small>View</small>
												</Box>
											</Link>
											<Link
												to={`/categories/${product._id}`}
												style={{
													textDecoration: "none",
													color: "black",
												}}
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
									</Box>
								</Card>
							</Grid>
						))}
					</Grid>
				</Box>

			</Container>
		</Box>
	);
};

Categories.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Categories;
