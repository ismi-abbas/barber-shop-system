const express = require("express");
const { addToSales, getAllSales } = require("../controllers/sales.controller");

const sales = express.Router();

sales.post("/order/create", async (req, res) => {
	const { body } = req;
	const response = await addToSales(body);

	res.status(response.statusCode).send(response);
});

module.exports = sales;
