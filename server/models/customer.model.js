const { executeQuery } = require("../utils/db");
const logger = require("../utils/logger");

// Customer functions
const findAll = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Customer;`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching customers: ${error.message}`);
	}
};

const findById = async (id) => {
	try {
		const query = `SELECT * FROM barber_shop.Customer WHERE id = ?;`;
		const data = [id];
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching customers: ${error.message}`);
	}
};

const create = async ({ name, email, phone, password }) => {
	try {
		const query =
			"INSERT INTO barber_shop.Customer (name, email, phone, password) VALUES (?, ?, ?, ?);";
		const data = [name, email, phone, password];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error creating customer";
		}
	} catch (error) {
		return error;
	}
};

const update = async ({ customerId, name, email, phone, password }) => {
	try {
		let query = "UPDATE barber_shop.Customer SET ";
		const data = [];

		if (name) {
			query += "name = ?, ";
			data.push(name);
		}
		if (email) {
			query += "email = ?, ";
			data.push(email);
		}
		if (phone) {
			query += "phone = ?, ";
			data.push(phone);
		}
		if (password) {
			query += "password = ?, ";
			data.push(password);
		}

		query = query.slice(0, -2) + " WHERE id = ?";
		data.push(customerId);

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error updating customer";
		}
	} catch (error) {
		return error;
	}
};

const remove = async (customerId) => {
	try {
		const query = "DELETE FROM barber_shop.Customer WHERE id = ?";
		const data = [customerId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error deleting customer";
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
