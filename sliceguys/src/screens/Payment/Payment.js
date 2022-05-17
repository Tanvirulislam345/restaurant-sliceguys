import { Button, Grid, Paper } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import master from "../../assets/card/master.png";
import mastro from "../../assets/card/mastro.png";
import visa from "../../assets/card/visa.png";
import AddressComp from "../../components/Profile/Address";
import useAuth from "../../Context/useAuth";
import CheckOutForm from "./CheckOutForm";
import "./Payment.css";

const stripePromise = loadStripe(
	"pk_live_51KXyRmGK4kZ0CjqNI27cxSQE1qcGTxWzDRrzMQudnnFfTBtQdQ5Tfxp96pgntXDUwqn7PKalIW4y3sDPcxwwXTmI00fugtpG3i"
);

function Payment() {
	const card = [visa, master, mastro];
	const [paymentType, setPaymentType] = useState("");
	const [alladdress, setAllAddress] = useState([]);

	const [selecteAddressId, setSelecteAddressId] = useState();
	const { user, cartItem, setCartItem } = useAuth();
	const navigate = useNavigate();

	const placeOrder = (items) => {
		const current = new Date();
		const date = moment(current).format("L");
		const time = moment(current).format("LT");

		const data = {
			items,
			email: user.email,
			date: date,
			time: time,
			paymentType: paymentType,
			status: "Pending Order",
			addressId: selecteAddressId,
		};

		if (data.addressId === undefined) {
			swal({
				text: "Please add your address",
				icon: "warning",
				buttons: false,
				timer: 2000,
			});
		} else {
			// console.log(data);
			axios
				.post(
					"https://restaurantsliceguys.sliceguys.co.uk/buy-product",
					data
				)
				.then((res) => {
					if (res.data.insertedId) {
						// setOpen(true);
						swal({
							title: "payment successfull",
							text: "Your order processed successfully",
							icon: "success",
							buttons: false,
							timer: 2000,
						});
						setCartItem([]);
						navigate("/nottification");
					}
				});
		}
	};

	const handleSubmit = () => {
		const fileterCartItems = cartItem.map((item, index) => ({
			id: item._id,
			title: item.title,
			quantity: item.quantity,
			totalQuantityPrice: item.totalQuantityPrice,
			topping: item.toopingNames,
			toppingsPrice: item.totalToopingPrice,
		}));

		// console.log(fileterCartItems);
		placeOrder(fileterCartItems);
	};

	const handlePostAddress = (address) => {
		setSelecteAddressId(address);
	};

	useEffect(() => {
		fetch("https://restaurantsliceguys.sliceguys.co.uk/address-collection")
			.then((res) => res.json())
			.then((data) => setAllAddress(data));
	}, []);

	const addressData = alladdress.filter((data) => data.Email === user.email);

	return (
		<div className="payment">
			<div className="main">
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={12}>
						<h1 className="favTitle">Payments</h1>
						<AddressComp
							addressData={addressData}
							handlePostAddress={handlePostAddress}
						/>
						<SingleItem setPaymentType={setPaymentType} images={card} />

						{paymentType === "Card" && (
							<Elements stripe={stripePromise}>
								<CheckOutForm
									selecteAddressId={selecteAddressId}
									placeOrder={placeOrder}
								/>
							</Elements>
						)}

						<SingleItem2 setPaymentType={setPaymentType} />

						{/* {paymentType === "Cash" && <ConfirmDialoge
              handleSubmit={handleSubmit}
            ></ConfirmDialoge>} */}
						{paymentType === "Cash" && (
							<Button
								onClick={handleSubmit}
								style={{
									padding: "5px 20px",
									background: "black",
									color: "white",
									margin: "15px 0px",
									fontSize: "16px",
									fontWeight: "bold",
								}}
							>
								Confirm £
								{cartItem.reduce(
									(total, prd) => total + prd?.totalQuantityPrice,
									0
								)}
							</Button>
						)}
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

function SingleItem({ images, setPaymentType }) {
	return (
		<Grid container>
			<Grid item xs={12} sm={12} md={12} sx={{ padding: "0" }}>
				<Paper className="checkbox">
					<h4>
						<input
							type="radio"
							name="option"
							onClick={() => {
								setPaymentType("Card");
							}}
						/>
						<span style={{ marginLeft: "5px" }}>
							Credit & Debit cards
						</span>
					</h4>
					<div className="images">
						{images?.map((item) => (
							<img src={item} alt="a" key={item} />
						))}
					</div>
				</Paper>
			</Grid>
		</Grid>
	);
}

function SingleItem2({ setPaymentType }) {
	return (
		<Grid container>
			<Grid item xs={12} sm={12} md={12} sx={{ padding: "0" }}>
				<Paper className="checkbox">
					<h4>
						<input
							type="radio"
							name="option"
							onClick={() => {
								setPaymentType("Cash");
							}}
						/>
						<span style={{ marginLeft: "5px" }}>Cash On Delivery</span>
					</h4>
					<div></div>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default Payment;
