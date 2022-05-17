import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

function Banner() {
	const [alldata, setAlldata] = useState([]);
	if (alldata?.length > 0) {
		swal({
			text: "This website was published for testing",
			icon: "warning",
		});
	}
	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/allbanner")
			.then((res) => res.json())
			.then((data) => setAlldata(data));
	}, []);
	return (
		<>
			<Grid container spacing={2}>
				{alldata?.map((value) => (
					<Grid item md={6} sm={6} xs={12} key={value._id}>
						<img src={`data:image/*;base64, ${value.file}`} alt="" />
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default Banner;
