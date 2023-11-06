const express = require("express");
const {
	getAll,
	getById,
	createBarber,
	updateBarber,
	deleteBarber,
} = require("../controllers/barber.controller");

const barberRouter = express.Router();

barberRouter.get("/", async (_req, res) => {
	const data = await getAll();
	res.status(200).send(data);
});

barberRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getById(id);
	res.send(data);
});

barberRouter.post("/create", async (req, res) => {
	const { body } = req;
	const data = await createBarber(body);
	res.send(data);
});

barberRouter.put("/update", async (req, res) => {
	const { body } = req;
	const response = await updateBarber(body);
	res.send(response);
});

barberRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await deleteBarber(id);
	res.send(response);
});

module.exports = barberRouter;
