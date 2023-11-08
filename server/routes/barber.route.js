const express = require("express");
const customer = require("../controllers/barber.controller");

const barberRouter = express.Router();

barberRouter.get("/", async (_req, res) => {
	const response = await customer.getAll();
	res.status(response.statusCode).send(response);
});

barberRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await customer.getById(id);
	res.status(response.statusCode).send(response);
});

barberRouter.post("/create", async (req, res) => {
	const { body } = req;
	const response = await customer.createBarber(body);

	res.status(response.statusCode).send(response);
});

barberRouter.put("/update", async (req, res) => {
	const { body } = req;
	const response = await customer.updateBarber(body);
	res.status(response.statusCode).send(response);
});

barberRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await customer.deleteBarber(id);
	res.status(response.statusCode).send(response);
});

module.exports = barberRouter;
