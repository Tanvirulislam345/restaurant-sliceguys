import { CircularProgress } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import useAuth from "../../Context/useAuth";
import "./CheckOutForm.css";

const CheckOutForm = ({ placeOrder, selecteAddressId }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [processing, setProcessing] = useState(false);
	const [clientSecrets, setClientSecret] = useState("");
	const { cartItem, setCartItem, user } = useAuth();
	console.log(clientSecrets);
	const price = cartItem.reduce(
		(total, prd) => total + prd?.totalQuantityPrice,
		0
	);

	const fileterCartItems = cartItem.map((item, index) => ({
		id: item._id,
		title: item.title,
		quantity: item.quantity,
		totalQuantityPrice: item.totalQuantityPrice,
		topping: item.toopingNames,
		toppingsPrice: item.totalToopingPrice,
	}));

	useEffect(() => {
		if (price > 0) {
			axios
				.post(
					"https://restaurantsliceguys.sliceguys.co.uk/create-payment-intent",
					{ price }
				)
				.then((res) => {
					if (res.data) {
						setClientSecret(res.data.clientSecret);
					}
				});
		} else {
			return;
		}
	}, [price]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(clientSecrets);
		if (selecteAddressId === undefined) {
			swal({
				text: "Add your address",
				icon: "warning",
				buttons: false,
				timer: 2000,
			});
			return;
		}

		if (!stripe || !elements) {
			return;
		}

		const card = elements.getElement(CardElement);
		if (card === null) {
			return;
		}

		setProcessing(true);
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			swal({
				text: error.message,
				icon: "error",
				buttons: false,
				timer: 2000,
			});
			setProcessing(false);
		} else {
			console.log(paymentMethod);
		}
		// payment intent
		const { paymentIntent, error: intentError } =
			await stripe.confirmCardPayment(clientSecrets, {
				payment_method: {
					card: card,
					billing_details: {
						email: user.email,
					},
				},
			});

		if (intentError) {
			swal({
				text: intentError.message,
				icon: "error",
				buttons: false,
				timer: 2000,
			});
			setProcessing(false);
		} else {
			placeOrder(fileterCartItems);
			setProcessing(false);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>
				{processing ? (
					<CircularProgress></CircularProgress>
				) : (
					<button
						type="submit"
						disabled={!stripe}
						style={{
							padding: "5px 20px",
							background: "black",
							color: "white",
							margin: "15px 0px",
							fontSize: "16px",
							fontWeight: "bold",
							border: "none",
							borderRadius: "5px",
						}}
					>
						Pay £{price}
					</button>
				)}
			</form>
		</div>
	);
};

export default CheckOutForm;
