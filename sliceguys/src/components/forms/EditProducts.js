import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { DashboardLayout } from "../layout/dashboard-layout";
import "./form.css";

const EditProducts = () => {
	const { id } = useParams();

	const [products, setProducts] = useState({});

	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/allproduts/${id}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, [id]);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		axios
			.put(
				`https://restaurantsliceguys.sliceguys.co.uk/allproduts/${id}`,
				data
			)
			.then((res) => {
				if (res.data) {
					swal({
						text: "Successfully updated your product",
						icon: "success",
						buttons: false,
						timer: 2000,
					});
				}
			});
	};

	return (
		<Box className="addressForm">
			{products?._id && (
				<Paper className="addressFormContainer">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box className="rowContainer">
							<Box className="rowItem">
								<img
									src={`data:image/*;base64, ${products.file}`}
									alt=""
									id="preview"
									style={{
										height: "100px",
										width: "100px",
										borderRadius: "100%",
										objectFit: "cover",
									}}
								/>
							</Box>

							<Box className="rowItem">
								<label>Product Category</label> <br />
								<input
									defaultValue={products.category}
									{...register("category")}
								/>
							</Box>
						</Box>
						<Box className="rowContainer">
							<Box className="rowItem">
								<label>Product title</label> <br />
								<input
									defaultValue={products.title}
									{...register("title")}
								/>
							</Box>
						</Box>
						<Box className="rowContainer">
							<Box className="rowItem">
								<label>Product Description</label>
								<input
									type="text"
									defaultValue={products.description}
									{...register("description")}
								/>
							</Box>
							<Box className="rowItem">
								<label>Regular Discount</label>
								<input
									type="number"
									defaultValue={products.regularDiscount}
									{...register("regularDiscount")}
								/>
							</Box>
						</Box>
						<Box className="rowContainer">
							<Box className="rowItem">
								<label>Medium Discount</label>
								<input
									type="number"
									defaultValue={products.mediumDiscount}
									{...register("mediumDiscount")}
								/>
							</Box>
							<Box className="rowItem">
								<label>Large Discount</label>
								<input
									type="number"
									defaultValue={products.largeDiscount}
									{...register("largeDiscount")}
								/>
							</Box>
						</Box>

						<input type="submit" value="Update" className="frombutton" />
						<input type="reset" value="Cancel" className="frombutton" />
					</form>
				</Paper>
			)}
		</Box>
	);
};

EditProducts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditProducts;
