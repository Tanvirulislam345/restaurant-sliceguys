import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AddBanner from "./components/forms/AddBanner";
import AddNotification from "./components/forms/AddNotification";
import CategoriFoms from "./components/forms/CategoriFoms";
import EditCategores from "./components/forms/EditCategores";
import EditProducts from "./components/forms/EditProducts";
import IngredientsForms from "./components/forms/IngredientsForms";
import ProductForms from "./components/forms/ProductForms";
import { DashboardLayout } from "./components/layout/dashboard-layout";
import Layout from "./components/layout/layout";
import AuthProvider from "./Context/AuthProvider";
import Categories from "./pages/categories";
import Dashboard from "./pages/Dashboard";
import FilterProducts from "./pages/FilterProducts";
import LastDayOrderList from "./pages/LastDayOrderList";
import LastMonthOrderList from "./pages/LastMonthOrderList";
import LastWeekOrderList from "./pages/LastWeekOrderList";
import MakeAdmin from "./pages/MakeAdmin";
import NewOrderList from "./pages/NewOrderList";
import Customers from "./pages/order-list";
import Orders from "./pages/orders";
import Products from "./pages/products";
import TodaysOrderList from "./pages/TodaysOrderList";
import AddAllCart from "./screens/Cart/AddAllCart";
import Favourite from "./screens/Favourite/Favourite";
import Landing from "./screens/Landing/landing";
import Nottification from "./screens/Nottification/Nottification";
import Payment from "./screens/Payment/Payment";
import Profile from "./screens/Profile/Profile";
import AddAddress from "./screens/Registration/AddAddress";
import AdminPrivateRoute from "./screens/Registration/PrivateRoute/AdminPrivateRoute";
import PrivateRoute from "./screens/Registration/PrivateRoute/PrivateRoute";
import SignIn from "./screens/Registration/SignIn";
import SignUp from "./screens/Registration/SignUp";
import { theme } from "./theme";

function App() {
	const [favArray, setFavArray] = useState([]);
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={
								<Layout>
									<Landing
										setFavArray={setFavArray}
										favArray={favArray}
									/>
								</Layout>
							}
						/>
						<Route
							path="/cart"
							element={
								<Layout>
									<AddAllCart />
								</Layout>
							}
						/>
						<Route
							path="/favourite"
							element={
								<Layout>
									<Favourite favArray={favArray} />
								</Layout>
							}
						/>
						<Route
							path="/nottification"
							element={
								<Layout>
									<Nottification />
								</Layout>
							}
						/>
						<Route
							path="/profile"
							element={
								<Layout>
									<Profile />
								</Layout>
							}
						/>

						<Route
							path="/payment"
							element={
								<PrivateRoute>
									<Layout>
										<Payment />
									</Layout>
								</PrivateRoute>
							}
						/>

						<Route
							path="/signin"
							element={
								<Layout>
									<SignIn />
								</Layout>
							}
						/>
						<Route
							path="/signup"
							element={
								<Layout>
									<SignUp />
								</Layout>
							}
						/>
						<Route
							path="/addaddress"
							element={
								<Layout>
									<AddAddress />
								</Layout>
							}
						/>

						<Route
							path="/orders/:ordersId"
							element={
								<Layout>
									<Orders />
								</Layout>
							}
						/>
						<Route
							path="/allorders/:ordersId"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<Orders />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/dashboard"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<Dashboard />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/customers"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<Customers />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/makeadmin"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<MakeAdmin />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/categories"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<Categories />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/banner"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<AddBanner />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/categories/:id"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<EditCategores />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/products/:id"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<EditProducts />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/todaysorders"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<TodaysOrderList />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/neworders"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<NewOrderList />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/lastweekorders"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<LastWeekOrderList />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/lastmonthorders"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<LastMonthOrderList />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/lastdayorders"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<LastDayOrderList />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/categoriforms"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<CategoriFoms />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/ingredientforms"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<IngredientsForms />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/products"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<Products />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/allproduts/:categoriName"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<FilterProducts />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>

						<Route
							path="/productforms"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<ProductForms />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/productforms"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<ProductForms />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
						<Route
							path="/addnotification"
							element={
								<AdminPrivateRoute>
									<DashboardLayout>
										<AddNotification />
									</DashboardLayout>
								</AdminPrivateRoute>
							}
						/>
					</Routes>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	);
}

export default App;
