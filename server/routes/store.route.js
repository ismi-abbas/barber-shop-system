const express = require("express");
const {
	addStoreSales,
	getRevenue,
	getStoreSales
} = require("../controllers/store.controller");

const store = express.Router();

store.post("/sales", async (req, res) => {
	const { customerId, itemId, quantity, total, barbershopId } = req.body;

	const response = await addStoreSales({
		customerId,
		itemId,
		quantity,
		total,
		barbershopId
	});

	res.status(response.statusCode).send(response);
});

store.get("/revenue/:shopId/:type", async (req, res) => {
	const { shopId, type } = req.params;
	const response = await getRevenue(shopId, type);

	res.status(response.statusCode).send(response);
});

module.exports = store;
