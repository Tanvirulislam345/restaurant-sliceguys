import { Box, Paper } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Context/useAuth";
import "./AddAddress.css";

const AddAddress = () => {
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();
	const { user } = useAuth();

	const onSubmit = (data) => {
		axios
			.post(
				"https://restaurantsliceguys.sliceguys.co.uk/address-collection",
				data
			)
			.then((res) => {
				if (res.data.insertedId) {
					alert("Address added succefully.");
					reset();
					navigate("/payment");
				}
			});
	};
	return (
		<Box className="addressForm">
			<Paper className="addressFormContainer">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box className="rowContainer">
						<Box className="rowItem">
							<label> Full Name</label> <br />
							<input type="text" {...register("firstname")} required />
						</Box>
						<Box className="rowItem">
							<label>Email</label> <br />
							<input
								type="email"
								value={user.email}
								{...register("Email")}
								required
							/>
						</Box>
					</Box>
					<Box className="rowContainer">
						<Box className="rowItem">
							<label>Phone Number</label> <br />
							<input type="number" {...register("phone")} required />
						</Box>
						<Box className="rowItem">
							<label>Address Line</label> <br />
							<input type="text" {...register("address")} required />
						</Box>
					</Box>
					<Box className="rowContainer">
						<Box className="rowItem">
							<label>Town/City</label> <br />
							<input type="text" {...register("city")} required />
						</Box>
						<Box className="rowItem">
							<label>Post Code</label> <br />
							<input type="text" {...register("postcode")} required />
						</Box>
					</Box>

					<input type="submit" value="Done" className="frombutton" />
					<input type="reset" value="Reset" className="frombutton" />
				</form>
			</Paper>
		</Box>
	);
};

export default AddAddress;
