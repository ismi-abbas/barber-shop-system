const express = require("express");
const {
	getAllBarbershop,
	getBarberShopById,
	createBarbershop,
	updateBarbershop,
	deleteBarbershop,
} = require("../controllers/barbershop.controller");

const barbershop = express.Router();

barbershop.get("/", async (_req, res) => {
	const response = await getAllBarbershop();
	res.status(response.statusCode).send(response);
});

barbershop.get("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getBarberShopById(id);
	res.status(data.statusCode).send(data);
});

barbershop.post("/create", async (req, res) => {
	const { body } = req;
	const data = await createBarbershop(body);
	res.status(data.statusCode).send(data);
});

barbershop.put("/update", async (req, res) => {
	const { body } = req;
	const response = await updateBarbershop(body);
	res.send(response);
});

barbershop.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await deleteBarbershop(id);
	res.send(response);
});

module.exports = barbershop;
