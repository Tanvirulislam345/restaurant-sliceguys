import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import initializaAuthentication from "../screens/Registration/firebase/firebase.init";
initializaAuthentication();

const useData = () => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const [allerrors, setAllErrors] = useState();
	const [adminData, setAdminData] = useState(false);
	const auth = getAuth();

	const registerUser = (userData) => {
		setLoading(true);
		createUserWithEmailAndPassword(auth, userData.email, userData.password)
			.then((userCredential) => {
				const newUser = {
					email: userData.email,
					displayName: userData.username,
				};
				setUser(newUser);

				saveUsers(userData, "POST");
				setAllErrors("");

				updateProfile(auth.currentUser, {
					displayName: userData.username,
				})
					.then(() => { })
					.catch((error) => {
						setAllErrors(error.message);
					});
			})
			.catch((error) => {
				setAllErrors(error.message);
			})
			.finally(() => setLoading(false));
	};

	const userSignIn = (userData, navigate, location) => {
		setLoading(true);
		signInWithEmailAndPassword(auth, userData.email, userData.password)
			.then((userCredential) => {
				updateUsers(userData, "PUT");
				const destination = location?.state?.from || "/";
				navigate(destination);
				setUser(userCredential.user);
				setAllErrors("");
			})
			.catch((error) => {
				setAllErrors(error.message);
			})
			.finally(() => setLoading(false));
	};

	const handleForgetPassword = (email) => {
		setLoading(true);
		sendPasswordResetEmail(auth, email).then((result) => {
			console.log(result);
		});
		setLoading(false);
	};

	const userSignOut = () => {
		setLoading(true);
		signOut(auth)
			.then(() => {
				// console.log('signOut successfully');
				setAllErrors("");
			})
			.catch((error) => {
				setAllErrors(error.message);
			})
			.finally(() => setLoading(false));
	};

	//save and update user details
	const navigate = useNavigate();

	const saveUsers = (data, methods) => {
		// console.log(data, methods)
		fetch("https://restaurantsliceguys.sliceguys.co.uk/alluser", {
			method: methods,
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					navigate("/");
				}
			});
	};
	const updateUsers = (data, methods) => {
		fetch(
			`https://restaurantsliceguys.sliceguys.co.uk/alluser/${data.email}`,
			{
				method: methods,
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(data),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.insertedId) {
					// console.log(data.insertedId);
				}
			});
	};

	useEffect(() => {
		if (user.email) {
			const url = `https://restaurantsliceguys.sliceguys.co.uk/useradmin/${user.email}`;

			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					setAdminData(data.admin);
					setLoading2(false);
				})
				.catch(() => setLoading2(false));
		}
	}, [user.email]);

	//observe user present
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser({});
			}
			setLoading(false);
		});
		return () => unsubscribe;
	}, [auth]);

	return {
		user,
		loading,
		loading2,
		allerrors,
		registerUser,
		userSignIn,
		handleForgetPassword,
		userSignOut,
		adminData,
	};
};

export default useData;
