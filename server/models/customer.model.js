const { executeQuery } = require("../utils/db");
const logger = require("../utils/logger");

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
		const response = await executeQuery(query, data);
		return response;
	} catch (error) {
		logger.error(`Error fetching customers: ${error.message}`);
	}
};

const create = async ({ name, email, phone, password }) => {
	try {
		const exist = await executeQuery(
			"SELECT * FROM barber_shop.Customer WHERE name = ? AND email = ?;",
			[name, email]
		);

		if (exist.length === 0) {
			const query =
				"INSERT INTO barber_shop.Customer (name, email, phone, password) VALUES (?, ?, ?, ?);";
			const data = [name, email, phone, password];

			const response = await executeQuery(query, data);

			if (response) {
				return response;
			} else {
				return "Error creating customer";
			}
		} else {
			return "Customer with this email existed";
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

const login = async (email) => {
	try {
		const query = `SELECT id, name, email, phone, password from Customer WHERE email = ?`;
		const data = [email];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error login customer";
		}
	} catch (error) {
		logger.error(`Error login customer: ${error.message}`);
	}
};

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
	login
};
