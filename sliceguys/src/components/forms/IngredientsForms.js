import { Paper } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { DashboardLayout } from "../layout/dashboard-layout";
import "./form.css";

const IngredientsForms = () => {
	const { register, handleSubmit, reset } = useForm();
	const onSubmit = (data) => {
		axios
			.post("https://restaurantsliceguys.sliceguys.co.uk/ingredients", data)
			.then((res) => {
				if (res.data.insertedId) {
					alert("Ingredients add succefully.");
					reset();
				}
			});
	};

	return (
		<Box className="formContainer">
			<Paper className="formsection">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box className="smallInputContainer">
						<Box className="smallInput">
							<label>Ingredients Name</label>
							<input {...register("ToopingName")} />
						</Box>
					</Box>
					<Box className="smallInputContainer">
						<Box className="smallInput">
							<label>Ingredients price</label>
							<input type="number" {...register("toopingPrice")} />
						</Box>
					</Box>

					<Box style={{ display: "flex", paddingLeft: "5px" }}>
						<input type="submit" className="frombutton" />
						<input type="reset" className="frombutton" />
					</Box>
				</form>
			</Paper>
		</Box>
	);
};
IngredientsForms.getLayout = (page) => (
	<DashboardLayout>{page}</DashboardLayout>
);
export default IngredientsForms;
