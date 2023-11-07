const { executeQuery } = require("../utils/db");
const { logger } = require("../utils/logger");

// Bookings functions
const findAll = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Bookings;`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching bookings: ${error.message}`);
	}
};

const findById = async (id) => {
	try {
		const query = `SELECT * FROM barber_shop.Bookings WHERE id = ?`;
		const data = [id];
		const response = await executeQuery(query, data);
		return response;
	} catch (error) {
		logger.error(`Error fetching bookings: ${error.message}`);
	}
};

const create = async ({ barberId, customerId, date_time }) => {
	try {
		const query =
			"INSERT INTO barber_shop.Bookings (barber_id, customer_id, date_time) VALUES (?, ?, ?)";
		const data = [barberId, customerId, date_time];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error creating booking";
		}
	} catch (error) {
		return error;
	}
};

const update = async ({ bookingId, barberId, customerId, date_time }) => {
	try {
		let query = "UPDATE barber_shop.Bookings SET ";
		const data = [];

		if (barberId) {
			query += "barber_id = ?, ";
			data.push(barberId);
		}
		if (customerId) {
			query += "customer_id = ?, ";
			data.push(customerId);
		}
		if (date_time) {
			query += "date_time = ?, ";
			data.push(date_time);
		}

		query = query.slice(0, -2) + " WHERE id = ?";
		data.push(bookingId);

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error updating booking";
		}
	} catch (error) {
		return error;
	}
};

const remove = async (bookingId) => {
	try {
		const query = "DELETE FROM barber_shop.Bookings WHERE id = ?";
		const data = [bookingId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error deleting booking";
		}
	} catch (error) {
		return error;
	}
};

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
};
