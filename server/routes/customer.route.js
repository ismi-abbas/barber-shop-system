const express = require("express");
const {
	getAllCustomers,
	getCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
	customerLogin
} = require("../controllers/customer.controller");

const customer = express.Router();

customer.get("/", async (_req, res) => {
	const data = await getAllCustomers();
	res.status(data.statusCode).send(data);
});

customer.get("/:id", async (req, res) => {
	const { id } = req.params;
	const data = await getCustomerById(id);
	res.send(data);
});

customer.post("/create", async (req, res) => {
	const { body } = req;
	const response = await createCustomer(body);

	res.status(response.statusCode).send(response);
});

customer.post("/login", async (req, res) => {
	const { body } = req;
	const response = await customerLogin(body);

	res.status(response.statusCode).send(response);
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
