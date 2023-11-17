const express = require("express");

const { getAllServices } = require("../controllers/service.controller");

const service = express.Router();

service.get("/", async (req, res) => {
	const response = await getAllServices();

	res.status(response.statusCode).send(response);
});

module.exports = service;
