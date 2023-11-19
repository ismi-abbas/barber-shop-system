const express = require("express");
const {
	addToSales,
	getAllSales,
	getRevenue,
	getByBookingId,
	updateSale,
} = require("../controllers/sales.controller");

const sales = express.Router();

sales.post("/order/create", async (req, res) => {
	const { body } = req;
	const response = await addToSales(body);

	res.status(response.statusCode).send(response);
});

sales.get("/revenue/:type", async (req, res) => {
	const { type } = req.params;
	const response = await getRevenue(type);

	res.status(response.statusCode).send(response);
});

sales.get("/booking/:bookingId", async (req, res) => {
	const { bookingId } = req.params;
	const response = await getByBookingId(bookingId);
	res.status(response.statusCode).send(response);
});

sales.put("/order/update/:salesId", async (req, res) => {
	const { salesId } = req.params;
	const { paymentStatus } = req.body;

	console.log({
		salesId,
		paymentStatus,
	});

	const response = await updateSale(salesId, paymentStatus);
	res.status(response.statusCode).send(response);
});

module.exports = sales;
