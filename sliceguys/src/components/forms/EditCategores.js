import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { DashboardLayout } from "../layout/dashboard-layout";

const EditCategores = () => {
	const { id } = useParams();

	const [products, setProducts] = useState({});

	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/allcategori/${id}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, [id]);

	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		axios
			.put(
				`https://restaurantsliceguys.sliceguys.co.uk/allcategori/${id}`,
				data
			)
			.then((res) => {
				if (res.data) {
					swal({
						text: "Successfully updated your categori",
						icon: "success",
						buttons: false,
						timer: 2000,
					});
				}
			});
	};

	return (
		<Box className="formContainer">
			{products?._id && (
				<Paper className="formsection">
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box
							style={{
								display: "flex",
								alignItems: "center",
								margin: "10px 0px",
							}}
						>
							<Box className="smallInput">
								<img
									src={`data:image/*;base64, ${products.file}`}
									alt=""
									id="preview"
									style={{
										height: "56px",
										width: "56px",
										borderRadius: "100%",
										objectFit: "cover",
									}}
								/>
							</Box>
						</Box>
						<Box className="smallInputContainer">
							<Box className="smallInput">
								<label>Title</label>
								<input
									type="text"
									defaultValue={products.categoriName}
									{...register("categoriName")}
								/>
							</Box>
						</Box>

						<Box style={{ display: "flex", paddingLeft: "5px" }}>
							<input type="submit" value="Update" className="btn" />
							<input type="reset" Value="Cancel" className="btn" />
						</Box>
					</form>
				</Paper>
			)}
		</Box>
	);
};

EditCategores.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EditCategores;
