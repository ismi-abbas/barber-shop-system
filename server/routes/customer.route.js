const express = require("express");
const {
	getAllCustomers,
	getCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
} = require("../controllers/customer.controller");

const customer = express.Router();

customer.get("/", async (_req, res) => {
	const data = await getAllCustomers();
	res.status(200).send(data);
});

customer.post("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getCustomerById(id);
	res.send(data);
});

customer.post("/create", async (req, res) => {
	const { body } = req;
	const data = await createCustomer(body);
	res.send(data);
});

customer.put("/update", async (req, res) => {
	const { body } = req;
	const response = await updateCustomer(body);
	res.send(response);
});

customer.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await deleteCustomer(id);
	res.send(response);
});

module.exports = customer;
