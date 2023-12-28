const express = require("express");
const barber = require("../controllers/barber.controller");

const barberRouter = express.Router();

barberRouter.get("/", async (_req, res) => {
	const response = await barber.getAll();
	res.status(response.statusCode).send(response);
});

barberRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await barber.getById(id);
	res.status(response.statusCode).send(response);
});

barberRouter.get("/shop/:barberShopId", async (req, res) => {
	const { barberShopId } = req.params;
	const response = await barber.getByShopId(barberShopId);
	res.status(response.statusCode).send(response);
});

barberRouter.post("/create", async (req, res) => {
	const response = await barber.createBarber(req.body);
	res.status(response.statusCode).send(response);
});

barberRouter.put("/update", async (req, res) => {
	const { body } = req;
	const response = await barber.updateBarber(body);
	res.status(response.statusCode).send(response);
});

barberRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await barber.deleteBarber(id);
	res.status(response.statusCode).send(response);
});

module.exports = barberRouter;
