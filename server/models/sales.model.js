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

module.exports = {
	findAll,
	findOrder,
	addOrder,
};
