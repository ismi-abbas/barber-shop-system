const { executeQuery } = require("../utils/db");
const { logger } = require("../utils/logger");

const findAll = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Barber;`;
		const response = await executeQuery(query, null);

		return response;
	} catch (error) {
		logger.error(`Error fetching barbers: ${error.message}`);
	}
};

const findById = async (id) => {
	try {
		const query = `SELECT * FROM barber_shop.Barber WHERE id = ?;`;
		const data = [id];
		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "No record found";
		}
	} catch (error) {
		logger.error(`Error fetching barbers: ${error.message}`);
	}
};

const findByShopId = async (shopId) => {
	try {
		const query = `SELECT * FROM Barber WHERE barbershop_id = ?;`;
		const data = [shopId];
		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "No record found";
		}
	} catch (error) {
		logger.error(`Error fetching barbers: ${error.message}`);
	}
};

const create = async ({ name, email, phone, shopId }) => {
	try {
		const exist = await executeQuery(
			"SELECT * FROM barber_shop.Barber WHERE name = ? AND email = ?",
			[name, email]
		);

		if (exist.length === 0) {
			const query =
				"INSERT INTO Barber (name, email, phone, barbershop_id, availability) VALUES (?, ?, ?, ?, ?)";
			const data = [name, email, phone, shopId, 1];

			const response = await executeQuery(query, data);

			if (response) {
				return response;
			} else {
				return "Error creating barber";
			}
		} else {
			return "Barber existed";
		}
	} catch (error) {
		logger.error(`Error creating barbers: ${error.message}`);
		return error;
	}
};

const update = async ({ id, name, email, phone, password }) => {
	try {
		let query = "UPDATE Barber SET ";
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
		data.push(id);

		const response = await executeQuery(query, data);

		if (response.affectedRows > 0) {
			return "success";
		} else {
			return "Error updating barber";
		}
	} catch (error) {
		return error;
	}
};

const remove = async (barberId) => {
	try {
		const query = "DELETE FROM Barber WHERE id = ?";
		const data = [barberId];

		const response = await executeQuery(query, data);

		if (response.affectedRows > 0) {
			return "success";
		} else if (response.affectedRows === 0) {
			return "No user found";
		} else {
			return "Error deleting barber";
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
	findByShopId
};
