import FolderIcon from "@mui/icons-material/Folder";
import { Avatar, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { DashboardLayout } from "../layout/dashboard-layout";
import "./form.css";

const ProductForms = () => {
	const [alldata, setAlldata] = useState([]);
	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allcategori")
			.then((res) => res.json())
			.then((data) => setAlldata(data));
	}, []);

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
		if (myfiles?.size > 200000) {
			swal({
				text: "Your image is over 200KB",
				icon: "warning",
			});
		} else {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("category", data.category);
			formData.append("description", data.description);
			formData.append("regularprice", data.regularPrice);
			formData.append("regularDiscount", data.regularDiscount);
			formData.append("mediumPrice", data.mediumPrice);
			formData.append("mediumDiscount", data.mediumDiscount);
			formData.append("largePrice", data.largePrice);
			formData.append("largeDiscount", data.largeDiscount);
			formData.append("myfiles", myfiles);

			fetch("https://restaurantsliceguys.sliceguys.co.uk/allproduts", {
				method: "POST",
				body: formData,
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.insertedId) {
						swal({
							text: "Successfully upload your product",
							icon: "success",
							buttons: false,
							timer: 2000,
						});
						reset();
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	};

	return (
		<Box className="addressForm">
			<Paper className="addressFormContainer">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box className="rowContainer">
						<Box className="rowItem">
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
						<Box className="rowItem">
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
						<Box className="rowItem">
							<label>Product Category</label> <br />
							<select
								{...register("category")}
								style={{ height: "40px", width: "100px" }}
							>
								{alldata ? (
									alldata.map((data) => (
										<option key={data._id} value={data.categoriName}>
											{data.categoriName}
										</option>
									))
								) : (
									<option value="burger">Berger</option>
								)}
							</select>
						</Box>
					</Box>
					<Box className="rowContainer">
						<Box className="rowItem">
							<label>Product title</label> <br />
							<input
								type="text"
								placeholder="Product Name"
								{...register("title")}
							/>
						</Box>
					</Box>
					<Box className="rowContainer">
						<Box className="rowItem">
							<label>Product Description</label>
							<input
								type="text"
								placeholder="Description"
								{...register("description")}
							/>
						</Box>
						<Box className="rowItem">
							<label>Regular size price / Discount</label>
							<input type="number" {...register("regularDiscount")} />
						</Box>
					</Box>
					<Box className="rowContainer">
						<Box className="rowItem">
							<label>Medium size price / Discount</label>
							<input type="number" {...register("mediumDiscount")} />
						</Box>
						<Box className="rowItem">
							<label>Large size price / Discount</label>
							<input type="number" {...register("largeDiscount")} />
						</Box>
					</Box>

					<input type="submit" value="Submit" className="frombutton" />
					<input type="reset" value="Reset" className="frombutton" />
				</form>
			</Paper>
		</Box>
	);
};

ProductForms.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ProductForms;
