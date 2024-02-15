const express = require("express");
const app = express();
const port = 3000;
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // support json encoded bodies
const joi = require("joi");
const fs = require("fs");
var cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Data
let movies = [
	{
		id: 1,
		title: "Spider Man - Across the Spider-Verse",
		genre: "Sci-Fi",
		release_date: "2020-08-29",
		runtime: 164,
		rating: 5,
		age_rating: "PG-13",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed purus euismod, faucibus orci vitae, cursus eros.",
		poster_image_url: "https://t.ly/pGWpH",
	},
	{
		id: 2,
		title: "Fast X",
		genre: "Sci-Fi",
		release_date: "2020-08-29",
		runtime: 164,
		rating: 5,
		age_rating: "PG-13",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed purus euismod, faucibus orci vitae, cursus eros.",
		poster_image_url: "https://t.ly/z69Vx",
	},
	{
		id: 3,
		title: "The Equalizer",
		genre: "Sci-Fi",
		release_date: "2020-08-29",
		runtime: 164,
		rating: 5,
		age_rating: "PG-13",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed purus euismod, faucibus orci vitae, cursus eros.",
		poster_image_url: "https://t.ly/CPCCF",
	},
	{
		id: 4,
		title: "Oppenheimer",
		genre: "Sci-Fi",
		release_date: "2020-08-29",
		runtime: 164,
		rating: 5,
		age_rating: "PG-13",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed purus euismod, faucibus orci vitae, cursus eros.",
		poster_image_url: "https://t.ly/0oeW5",
	},
	{
		id: 5,
		title: "The Whale",
		genre: "Sci-Fi",
		release_date: "2020-08-29",
		runtime: 164,
		rating: 5,
		age_rating: "PG-13",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed purus euismod, faucibus orci vitae, cursus eros.",
		poster_image_url: "https://rb.gy/lufbt6",
	},
	{
		id: 6,
		title: "Animatronic",
		genre: "Sci-Fi",
		release_date: "2020-08-29",
		runtime: 164,
		rating: 5,
		age_rating: "PG-13",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sed purus euismod, faucibus orci vitae, cursus eros.",
		poster_image_url: "https://rb.gy/97kvhh",
	},
];

let orders = [
	{
		id: 1,
		movie_id: 1,
		order_date: "14/02/2024",
		status: "Waiting for payments",
	},
];

const validateMovie = (movie) => {
	const schema = joi.object({
		title: joi.string().min(3),
		genre: joi.string(),
		release_date: joi.date(),
		runtime: joi.number().integer(),
		rating: joi.number().integer(),
		age_rating: joi.string(),
		synopsis: joi.string(),
		poster_image_url: joi.string().uri(),
	});

	return schema.validate(movie);
};

app.get("/", (req, res) => {
	res.send("Selamat Datang di API Team SE7");
});
// ================================= For Admins ====================
// Post movie data
app.post("/movie-control", (req, res) => {
	const {
		title,
		genre,
		release_date,
		runtime,
		rating,
		age_rating,
		synopsis,
		poster_image_url,
	} = req.body;
	const id = movies.length + 1;

	const { error } = validateMovie(req.body);

	if (error) {
		return res.status(400).json({
			messages: error.details[0].message,
		});
	}

	const newMovie = {
		id,
		title,
		genre,
		release_date,
		runtime,
		rating,
		age_rating,
		synopsis,
		poster_image_url,
	};

	console.log(newMovie);
	movies.push(newMovie);

	res.status(201).json({
		messages: "New Movie has been listed",
		data: newMovie,
	});
});

// Update/Edit movie
app.put("/movie-control/:id", (req, res) => {
	const id = req.params.id;
	const {
		title,
		genre,
		release_date,
		runtime,
		rating,
		age_rating,
		synopsis,
		poster_image_url,
	} = req.body;

	const { error } = validateMovie(req.body);

	if (error) {
		return res.status(400).json({
			messages: error.details[0].message,
		});
	}

	const movie = movies.find((movie) => movie.id == id);

	if (!movie) {
		return res.status(404).json({
			messages: "Data Not Found",
		});
	}

	movie.title = title;
	movie.genre = genre;
	movie.release_date = release_date;
	movie.runtime = runtime;
	movie.rating = rating;
	movie.age_rating = age_rating;
	movie.synopsis = synopsis;
	movie.poster_image_url = poster_image_url;

	res.status(200).json({
		messages: "Movie details updated!",
		data: movie,
	});
});

// delete movies
app.delete("/movie-control/:id", (req, res) => {
	const id = req.params.id;
	const movie = movies.find((movie) => movie.id == id);

	if (!movie) {
		return res.status(404).json({
			messages: "Data Not Found",
		});
	}

	const index = movies.indexOf(movie);
	movies.splice(index, 1);

	res.status(200).json({
		messages: "Movie deleted",
		data: movie,
	});
});

// ================================= For User ====================
// get all movies
app.get("/movies", (req, res) => {
	const movie = movies;
	if (!movie) {
		res.status(404).json({
			messages: "Data Not Found",
		});
	}

	res.status(200).json({
		messages: "Success Get Data",
		data: movie,
	});
});
// Get detail movies by id
app.get("/movie-details/:id", (req, res) => {
	const id = req.params.id;
	const movie = movies.find((movie) => movie.id == id);

	if (!movie) {
		res.status(404).json({
			messages: "Data Not Found",
		});
	}

	res.status(200).json({
		messages: "Success Get Movie Details",
		data: movie,
	});
});
// Get all order
app.get("/orders", (req, res) => {
	const order = orders;

	if (!order) {
		res.status(404).json({
			messages: "Data Not Found",
		});
	}

	res.status(200).json({
		messages: "Success Get Order list",
		data: order,
	});
});
// Get order details by id
app.get("/order-details/:id", (req, res) => {
	const id = req.params.id;
	const order = orders.find((order) => order.id == id);

	if (!order) {
		res.status(404).json({
			messages: "Data Not Found",
		});
	}

	res.status(200).json({
		messages: "Success Get Data",
		data: order,
	});
});
// Add order
app.post("/order-details", (req, res) => {
	const id = orders.length + 1;
	const newOrder = {
		id,
		movie_id: req.body,
		order_date,
		status: "Waiting for payment",
	};

	console.log(newOrder);
	orders.push(newOrder);

	res.status(201).json({
		messages: "New Order has been added",
		data: newOrder,
	});
});
// Delete Order
app.delete("/order-details/:id", (req, res) => {
	const id = req.params.id;
	const order = orders.find((order) => order.id == id);

	if (!order) {
		return res.status(404).json({
			messages: "Data Not Found",
		});
	}

	const index = orders.indexOf(order);
	orders.splice(index, 1);

	res.status(200).json({
		messages: "Order has been deleted",
		data: order,
	});
});

// Update/Edit status
app.put("/order-details/:id", (req, res) => {
	const id = req.params.id;
	const { status } = req.body;
	const order = orders.find((order) => order.id == id);

	if (!order) {
		return res.status(404).json({
			messages: "Data Not Found",
		});
	}

	order.status = status;

	res.status(200).json({
		messages: "Order status updated",
		data: order,
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
