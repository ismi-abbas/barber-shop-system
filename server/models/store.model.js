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

const getStoreRevenue = async (barbershopId, type) => {
	try {
		let query = "";

		if (type === "weekly") {
			query = `SELECT DATE(date)                  AS day,
						COUNT(DISTINCT customer_id) AS total_customers,
						SUM(total)                  AS daily_revenue
						FROM Store_Sales
						WHERE WEEK(date) = WEEK(CURDATE()) AND barbershop_id = ?
						GROUP BY day;`;
		} else if (type === "today") {
			query = `SELECT SUM(total)                  AS total_sales_today,
						COUNT(DISTINCT customer_id) AS total_customers
						FROM Store_Sales
						WHERE DATE(date) = CURDATE() AND barbershop_id = ?;`;
		} else {
			query = `SELECT DATE_FORMAT(date, '%Y-%m') AS month,
						DATE(date)                 AS day,
						SUM(total)                 AS daily_revenue
						FROM Store_Sales
						WHERE barbershop_id = ?
						GROUP BY month, day
						ORDER BY month, day;`;
		}

		const response = await executeQuery(query, [barbershopId]);

		if (response) {
			return response;
		} else {
			return "No revenue record found";
		}
	} catch (error) {
		logger.error(`Error fetching order details: ${error.message}`);
	}
};

module.exports = {
	add,
	getAll,
	getStoreRevenue
};
