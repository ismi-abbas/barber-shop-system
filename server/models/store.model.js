const { executeQuery } = require("../utils/db");
const { logger } = require("../utils/logger");

const add = async ({ customerId, itemId, quantity, total, barbershopId }) => {
	try {
		const query = `INSERT INTO Store_Sales (customer_id, item_id, quantity, total, barbershop_id)
        VALUES (? ,? ,? , ?, ?);`;
		const data = [customerId, itemId, quantity, total, barbershopId];

		const response = await executeQuery(query, data);

		if (response) {
			const currentStockQuery = "SELECT quantity FROM Items WHERE id = ?";
			const currentStock = (await executeQuery(currentStockQuery, [itemId]))[0]
				.quantity;

			const updateStockQuery = "UPDATE Items SET quantity = ? WHERE id = ?";
			const finalQuantity = currentStock - quantity;
			await executeQuery(updateStockQuery, [finalQuantity, itemId]);
		}
		return response;
	} catch (error) {
		logger.error(`Error fetching services: ${error.message}`);
	}
};

const getAll = async () => {
	try {
		const query = `SELECT * FROM Store_Sales;`;

		const response = await executeQuery(query, null);

		return response;
	} catch (err) {
		logger.error(`Error fetching store sales ${err.message}`);
	}
};

module.exports = {
	add,
	getAll
};
