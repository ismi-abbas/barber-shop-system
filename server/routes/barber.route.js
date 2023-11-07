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
	const response = await getAll();
	res.status(response.statusCode).send(response);
});

barberRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await getById(id);
	res.status(response.statusCode).send(response);
});

barberRouter.post("/create", async (req, res) => {
	const { body } = req;
	const response = await createBarber(body);

	res.status(response.statusCode).send(response);
});

barberRouter.put("/update", async (req, res) => {
	const { body } = req;
	const response = await updateBarber(body);
	res.status(response.statusCode).send(response);
});

barberRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await deleteBarber(id);
	res.status(response.statusCode).send(response);
});

module.exports = barberRouter;
