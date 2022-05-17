import { Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Context/useAuth";

function ProfileComp() {
	const { register, handleSubmit, reset } = useForm();
	const { user, loading } = useAuth();
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const url = `https://restaurantsliceguys.sliceguys.co.uk/alluser/${user.email}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => setUserData(data));
	}, [user.email]);

	if (loading) {
		return <p>looding...</p>;
	}
	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Paper className="profile">
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{ padding: "0px 30px" }}
			>
				<Box className="rowContainer">
					<Box className="rowItem">
						<label> Full Name</label> <br />
						<input
							type="text"
							defaultValue={userData?.username}
							{...register("username")}
							required
						/>
					</Box>
				</Box>
				<Box className="rowContainer">
					<Box className="rowItem">
						<label> Email</label> <br />
						<input
							type="email"
							defaultValue={userData?.email}
							{...register("email")}
							required
						/>
					</Box>
				</Box>
				<Box className="rowContainer">
					<Box className="rowItem">
						<label> Password</label> <br />
						<input
							type="password"
							defaultValue={userData?.password}
							{...register("password")}
							required
						/>
					</Box>
				</Box>
			</form>
		</Paper>
	);
}

export default ProfileComp;
