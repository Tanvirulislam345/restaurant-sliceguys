import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useAuth from "../../Context/useAuth";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

const Ingreadients = ({ updatedProduct }) => {
	const { addToCart } = useAuth();
	const [open, setOpen] = useState(false);
	const [tooping, setTooping] = useState([]);
	const [allTopping, setAllTopping] = useState([]);
	const [toggle, setToggle] = useState(true);
	const [toggle2, setToggle2] = useState(true);

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/ingredients")
			.then((res) => res.json())
			.then((data) => setAllTopping(data));
	}, []);

	const addToopings = (indexId) => {
		const data = allTopping.filter((value, index) => index === indexId);
		setTooping([...tooping, data[0]]);
	};

	const removeToopings = (indexId) => {
		const remainData = tooping.filter((value, index) => index !== indexId);
		setTooping(remainData);
	};

	const value = tooping.reduce(
		(pri, pro) => parseInt(pri) + parseInt(pro.toopingPrice),
		0
	);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleCart = () => {
		const totalToopingPrice = tooping.reduce(
			(total, prd) => parseInt(total) + parseInt(prd?.toopingPrice),
			0
		);

		const allToopingNames = tooping.reduce(
			(previous, current) => previous + current?.ToopingName + ",",
			""
		);

		const data = {
			...updatedProduct,
			toopingNames: allToopingNames,
			totalToopingPrice: totalToopingPrice,
			price: updatedProduct.price + totalToopingPrice,
			totalQuantityPrice: updatedProduct.price + totalToopingPrice,
		};
		addToCart(data);
		setTooping([]);
		setOpen(false);
	};

	return (
		<div>
			<div className="addButton">
				<Button
					className="btn-add"
					variant="contained"
					onClick={handleClickOpen}
				>
					Add to Cart
				</Button>
			</div>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{updatedProduct.title}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<TableContainer
						sx={{
							backgroundColor: "#E5E5E5",
							color: "white",
							width: "350px",
						}}
					>
						<Table aria-label="spanning table">
							<TableHead>
								<TableRow>
									<TableCell sx={{ color: "#F2D7D5" }}>
										Current Toopings
									</TableCell>
									<TableCell sx={{ color: "#F2D7D5" }}></TableCell>
									<TableCell sx={{ color: "#F2D7D5" }}>
										<KeyboardArrowDownIcon
											onClick={() => setToggle(!toggle)}
											style={{
												transform: toggle
													? "rotate(360deg)"
													: "rotate(180deg)",
											}}
										/>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody style={{ display: toggle && "none" }}>
								{tooping ? (
									tooping.map((top, index) => (
										<TableRow key={index}>
											<TableCell sx={{ py: 0 }}>
												{top.ToopingName}
											</TableCell>
											<TableCell sx={{ py: 0 }}>
												{top.toopingPrice}
											</TableCell>
											<TableCell align="center" sx={{ py: 0 }}>
												<h3
													className="addToopping"
													onClick={() => removeToopings(index)}
												>
													-
												</h3>
											</TableCell>
										</TableRow>
									))
								) : (
									<h2>loadding</h2>
								)}
							</TableBody>

							<TableHead>
								<TableRow>
									<TableCell sx={{ color: "#F2D7D5" }}>
										Add Toppings
									</TableCell>
									<TableCell sx={{ color: "#F2D7D5" }}></TableCell>
									<TableCell sx={{ color: "#F2D7D5" }}>
										<KeyboardArrowDownIcon
											onClick={() => setToggle2(!toggle2)}
											style={{
												transform: toggle2
													? "rotate(360deg)"
													: "rotate(180deg)",
											}}
										/>
									</TableCell>
								</TableRow>
							</TableHead>

							<TableBody style={{ display: toggle2 && "none" }}>
								{allTopping ? (
									allTopping.map((top, index) => (
										<TableRow key={index}>
											<TableCell sx={{ py: 0 }}>
												{top.ToopingName}
											</TableCell>
											<TableCell sx={{ py: 0 }}>
												{top.toopingPrice}
											</TableCell>
											<TableCell align="center" sx={{ py: 0 }}>
												<h3
													className="addToopping"
													onClick={() => addToopings(index)}
												>
													+
												</h3>
											</TableCell>
										</TableRow>
									))
								) : (
									<h2>loadding</h2>
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
				<div className="addButton">
					<Button
						className="btn-add"
						variant="contained"
						onClick={handleCart}
					>
						Add to Cart
						<span style={{ margin: "0px 20px" }}>
							£ {updatedProduct.price + value}
						</span>
					</Button>
				</div>
			</BootstrapDialog>
		</div>
	);
};
export default Ingreadients;
