const { executeQuery } = require("../utils/db");
const { logger } = require("../utils/logger");

const findAll = async () => {
	try {
		const query = `SELECT * FROM Sales;`;
		const response = await executeQuery(query, null);

		return response;
	} catch (error) {
		logger.error(`Error fetching sales info: ${error.message}`);
	}
};

const findOrder = async (orderId) => {
	try {
		const query = `SELECT * FROM Sales WHERE id = ?;`;
		const data = [orderId];
		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "No record found";
		}
	} catch (error) {
		logger.error(`Error fetching order details: ${error.message}`);
	}
};

const findByBookingId = async (bookingId) => {
	try {
		const query = `SELECT * FROM Sales WHERE booking_id = ?;`;
		const data = [bookingId];
		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "No record found";
		}
	} catch (error) {
		logger.error(`Error fetching order details: ${error.message}`);
	}
};

const addOrder = async ({
	barbershopId,
	bookingId,
	date,
	amount,
	serviceId,
	barberId,
	paymentStatus,
}) => {
	try {
		const exist = await executeQuery(
			"SELECT * FROM Sales WHERE booking_id = ?;",
			[bookingId]
		);

		if (exist.length === 0) {
			const query =
				"INSERT INTO Sales (barbershop_id, booking_id, date, amount, service_id, barber_id, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)";
			const data = [
				barbershopId,
				bookingId,
				date,
				amount,
				serviceId,
				barberId,
				paymentStatus,
			];
			const response = await executeQuery(query, data);

			if (response) {
				return response;
			} else {
				return "Error adding sales";
			}
		} else {
			return "Order existed";
		}
	} catch (error) {
		logger.error(`Error adding order: ${error.message}`);
	}
};

const getRevenue = async (type) => {
	try {
		let query = "";

		if (type === "weekly") {
			query = `SELECT DATE(date) AS day, 
							COUNT(DISTINCT id) AS total_customers,
							SUM(amount) AS daily_revenue 
							FROM barber_shop.Sales
							WHERE WEEK(date) = WEEK(CURDATE()) AND payment_status = 'paid'
							GROUP BY day;`;
		} else if (type === "today") {
			query = `SELECT SUM(amount) AS total_sales_today,
							COUNT(DISTINCT id) AS total_customers
							FROM barber_shop.Sales
							WHERE DATE(date) = CURDATE() AND payment_status = 'paid';`;
		} else {
			query = `SELECT DATE_FORMAT(date, '%Y-%m') AS month,
							DATE(date)                 AS day,
							SUM(amount)                AS daily_revenue
							FROM barber_shop.Sales
							GROUP BY month, day
							ORDER BY month, day;`;
		}

		const response = await executeQuery(query, null);

		if (response) {
			return response;
		} else {
			return "No revenue record found";
		}
	} catch (error) {
		logger.error(`Error fetching order details: ${error.message}`);
	}
};

const update = async (salesId, paymentStatus) => {
	try {
		const query = `UPDATE Sales SET payment_status = ? WHERE id = ?`;
		const data = [paymentStatus, salesId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Failed updating sales";
		}
	} catch (error) {
		logger.error(`Error fetching order details: ${error.message}`);
	}
};

module.exports = {
	findAll,
	findOrder,
	addOrder,
	getRevenue,
	findByBookingId,
	update,
};
