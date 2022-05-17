import FolderIcon from "@mui/icons-material/Folder";
import { Avatar, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { DashboardLayout } from "../layout/dashboard-layout";
import "./form.css";

const AddBanner = () => {
	const { register, handleSubmit, reset } = useForm();

	const [myfiles, setMyFiles] = useState(null);
	const inputRef = useRef(HTMLInputElement);

	const getImagePreview = (e) => {
		let image = URL.createObjectURL(e.target.files[0]);
		let imagediv = document.getElementById("preview");
		imagediv.src = image;
		setMyFiles(e.target.files[0]);
	};

	const onSubmit = (data) => {
		console.log(data);
		const formData = new FormData();
		formData.append("myfiles", myfiles);

		fetch("https://restaurantsliceguys.sliceguys.co.uk/addbanner", {
			method: "POST",
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				//   console.log('hello')
				if (data.insertedId) {
					alert("Banner is added succefully");
					reset();
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<Box className="formContainer">
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
								src=""
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

						<Box className="smallInput" sx={{ mx: "30px" }}>
							<input
								type="file"
								accept="image/*"
								// {...register("imageFile")}
								onChange={getImagePreview}
								style={{ display: "none" }}
								ref={inputRef}
							/>
							<Avatar onClick={() => inputRef.current.click()}>
								<FolderIcon />
							</Avatar>
						</Box>
					</Box>

					<Box style={{ display: "flex", paddingLeft: "5px" }}>
						<input type="submit" value="Upload" className="frombutton" />
					</Box>
				</form>
			</Paper>
		</Box>
	);
};
AddBanner.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default AddBanner;
