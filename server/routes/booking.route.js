const express = require("express");
const {
	getAllBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking,
	getByCustomerId,
} = require("../controllers/booking.controller");

const booking = express.Router();

booking.get("/", async (_req, res) => {
	const data = await getAllBookings();
	res.status(200).send(data);
});

booking.post("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getBookingById(id);
	res.send(data);
});

booking.post("/create", async (req, res) => {
	const { body } = req;
	const data = await createBooking(body);
	res.send(data);
});

booking.put("/update", async (req, res) => {
	const { body } = req;
	const response = await updateBooking(body);
	res.send(response);
});

booking.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await deleteBooking(id);
	res.send(response);
});

booking.get("/customer/:customerId", async (req, res) => {
	const { customerId } = req.params;
	const response = await getByCustomerId(customerId);
	console.log(response);
	res.status(response.statusCode).send(response);
});

module.exports = booking;
