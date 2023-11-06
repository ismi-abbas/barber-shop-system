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
	const data = await getAllBarbershop();
	res.status(200).send(data);
});

barbershop.post("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getBarberShopById(id);
	res.send(data);
});

barbershop.post("/create", async (req, res) => {
	const { body } = req;
	const data = await createBarbershop(body);
	res.send(data);
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
