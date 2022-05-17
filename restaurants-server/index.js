const express = require("express");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.845tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

async function run() {
	try {
		await client.connect();
		const database = client.db("restaurants-app");
		const registerUserCollection = database.collection(
			"register-user-collection"
		);
		const categoriCollection = database.collection("all-categori");
		const ingredientsCollection = database.collection("all-ingredients");
		const productsCollection = database.collection("all-products");
		const buyCollection = database.collection("buy-products");
		const addressCollection = database.collection("address-collection");
		const favouriteCollection = database.collection("Favourite-collection");
		const BannerCollection = database.collection("Banner-collection");

		app.post("/alluser", async (req, res) => {
			const user = req.body;
			// console.log(user);
			const result = await registerUserCollection.insertOne(user);
			res.json(result);
		});
		app.put("/alluser/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const userpass = req.body.password;
			// console.log(userpass)
			const updateDoc = { $set: { password: userpass } };
			const options = { upsert: true };
			const result = await registerUserCollection.updateOne(
				query,
				updateDoc,
				options
			);
			res.json(result);
		});
		app.get("/alluser/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const result = await registerUserCollection.findOne(query);
			res.json(result);
		});
		app.get("/useradmin/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const result = await registerUserCollection.findOne(query);
			let isAdmin = false;
			if (result?.role === "admin") {
				isAdmin = true;
			}
			res.json({ admin: isAdmin });
		});

		app.get("/makeadmin", async (req, res) => {
			const cursor = registerUserCollection.find({});
			const result = await cursor.toArray();
			// console.log(result);
			res.json(result);
		});
		app.get("/makeadmin/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const data = req.body;
			const updateDoc = { $set: data };
			const options = { upsert: true };
			const result = await registerUserCollection.updateOne(
				query,
				updateDoc,
				options
			);
			res.json(result);
		});

		app.post("/address-collection", async (req, res) => {
			const address = req.body;
			const result = await addressCollection.insertOne(address);
			res.json(result);
		});
		app.get("/address-collection", async (req, res) => {
			const cursor = addressCollection.find({});
			const result = await cursor.toArray();
			// console.log(result);
			res.json(result);
		});
		app.get("/address-collection/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await addressCollection.findOne(query);
			res.json(result);
		});

		app.post("/ingredients", async (req, res) => {
			const ingredients = req.body;
			const result = await ingredientsCollection.insertOne(ingredients);
			res.json(result);
		});
		app.get("/ingredients", async (req, res) => {
			const cursor = ingredientsCollection.find({});
			const result = await cursor.toArray();
			res.json(result);
		});

		app.post("/allcategori", async (req, res) => {
			const categoriName = req.body.categoriName;
			const file = req.files.myfiles;
			const fileData = file.data;
			const encodedFile = fileData.toString("base64");
			const fileBuffer = Buffer.from(encodedFile, "base64");
			const categoridata = {
				categoriName,
				file: fileBuffer,
			};
			const result = await categoriCollection.insertOne(categoridata);
			res.json(result);
		});

		app.get("/allcategori", async (req, res) => {
			const cursor = categoriCollection.find({});
			const result = await cursor.toArray();
			// console.log(result);
			res.json(result);
		});
		app.get("/allcategori/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await categoriCollection.findOne(query);
			res.json(result);
		});
		app.put("/allcategori/:id", async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const user = req.body;
			const updateDoc = { $set: user };
			const options = { upsert: true };
			const result = await categoriCollection.updateOne(
				filter,
				updateDoc,
				options
			);
			res.json(result);
		});
		app.delete("/allcategori/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const deleteProduct = await categoriCollection.deleteOne(query);
			res.json(deleteProduct);
		});

		app.post("/allproduts", async (req, res) => {
			const product = req.body;
			const file = req.files.myfiles;
			const fileData = file.data;
			const encodedFile = fileData.toString("base64");
			const fileBuffer = Buffer.from(encodedFile, "base64");
			const productdata = {
				...product,
				file: fileBuffer,
			};
			// console.log(productdata);
			const result = await productsCollection.insertOne(productdata);
			res.json(result);
		});

		app.get("/allproduts", async (req, res) => {
			const cursor = productsCollection.find({});
			const result = await cursor.toArray();
			// console.log(result);
			res.json(result);
		});
		app.get("/allproduts/:id", async (req, res) => {
			const id = req.params.id;
			// console.log(id);
			const query = { _id: ObjectId(id) };
			const result = await productsCollection.findOne(query);
			res.json(result);
		});
		app.get("/products/:name", async (req, res) => {
			const isName = req.params.name;
			const query = { category: isName };
			const cursor = productsCollection.find(query);
			const result = await cursor.toArray();
			res.json(result);
		});
		app.put("/allproduts/:id", async (req, res) => {
			const id = req.params.id;
			const filter = { _id: ObjectId(id) };
			const user = req.body;
			const updateDoc = { $set: user };
			const options = { upsert: true };
			const result = await productsCollection.updateOne(
				filter,
				updateDoc,
				options
			);
			res.json(result);
		});
		app.delete("/allproduts/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const deleteProduct = await productsCollection.deleteOne(query);
			res.json(deleteProduct);
		});

		app.post("/buy-product", async (req, res) => {
			const buyProduct = req.body;
			// console.log(buyProduct);
			const result = await buyCollection.insertOne(buyProduct);
			res.json(result);
		});
		app.get("/buy-product", async (req, res) => {
			const cursor = buyCollection.find({});
			const result = await cursor.toArray();
			// console.log(result);
			res.json(result);
		});

		app.get("/buy-product/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await buyCollection.findOne(query);
			res.json(result);
		});
		app.put("/update-sell-products/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const data = req.body;
			const updateDoc = { $set: data };
			const options = { upsert: true };
			const result = await buyCollection.updateOne(
				query,
				updateDoc,
				options
			);
			res.json(result);
		});
		app.get("/my-product/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const cursor = buyCollection.find(query);
			const result = await cursor.toArray();
			const value = result.filter(
				(re) =>
					re.status !== "Canceled Order" && re.status !== "Delivered Order"
			);
			res.json(value);
		});
		app.get("/my-product-history/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const cursor = buyCollection.find(query);
			const result = await cursor.toArray();
			const value = result.filter(
				(re) =>
					re.status === "Canceled Order" || re.status === "Delivered Order"
			);
			res.json(value);
		});

		app.post("/favouritelist", async (req, res) => {
			const favouriteItem = req.body;
			const result = await favouriteCollection.insertOne(favouriteItem);
			res.json(result);
		});
		app.get("/favouritelist/:email", async (req, res) => {
			const email = req.params.email;
			const query = { email: email };
			const cursor = favouriteCollection.find(query);
			const result = await cursor.toArray();
			res.json(result);
		});
		app.delete("/favouritelist/:id", async (req, res) => {
			const id = req.params.id;
			const query = { id: id };
			const deleteFavourite = await favouriteCollection.deleteOne(query);
			res.json(deleteFavourite);
		});

		app.post("/addbanner", async (req, res) => {
			const file = req.files.myfiles;
			const fileData = file.data;
			const encodedFile = fileData.toString("base64");
			const fileBuffer = Buffer.from(encodedFile, "base64");
			const bannerData = {
				file: fileBuffer,
			};
			const result = await BannerCollection.insertOne(bannerData);
			res.json(result);
		});

		app.get("/allbanner", async (req, res) => {
			const cursor = BannerCollection.find({});
			const result = await cursor.toArray();
			res.json(result);
		});

		// This is your test secret API key.
		const stripe = require("stripe")(
			"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"
		);

		app.post("/create-payment-intent", async (req, res) => {
			const paymentInfo = req.body;
			const amount = paymentInfo.price * 100;

			// Create a PaymentIntent with the order amount and currency
			const paymentIntent = await stripe.paymentIntents.create({
				currency: "eur",
				amount: amount,
				automatic_payment_methods: {
					enabled: true,
				},
			});

			res.json({
				clientSecret: paymentIntent.client_secret,
			});
		});
	} finally {
		//   await client.close();
	}
}
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("Hello Node js, this is my resturants project");
});

app.listen(port, () => {
	console.log("listening to port", port);
});
