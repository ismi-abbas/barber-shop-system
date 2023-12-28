const express = require("express");
const {
	managerLogin,
	getAllBookings,
	managerRegister
} = require("../controllers/manager.controller");
const manager = express.Router();

manager.post("/login", async (req, res) => {
	const { body } = req;
	const response = await managerLogin(body);

	res.status(response.statusCode).send(response);
});

manager.post("/create", async (req, res) => {
	const { body } = req;
	const response = await managerRegister(body);

	res.status(response.statusCode).send(response);
});

manager.get("/getBookings/:shopId", async (req, res) => {
	const { shopId } = req.params;
	const response = await getAllBookings(shopId);

	res.status(response.statusCode).send(response);
});

module.exports = manager;
