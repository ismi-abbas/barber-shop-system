const { executeQuery } = require("../utils/db");
const logger = require("../utils/logger");

const findAll = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Barbershop;`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching barbershops: ${error.message}`);
	}
};

const findById = async (id) => {
	try {
		const query = `SELECT * FROM barber_shop.Barbershop WHERE id = ?;`;
		const data = [id];
		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			throw new Error();
		}
	} catch (error) {
		logger.error(`Error fetching barbershops: ${error.message}`);
	}
};

const create = async ({ name, location }) => {
	try {
		const exist = await executeQuery(
			"SELECT * FROM barber_shop.Barbershop WHERE name = ? AND location = ?",
			[name, location]
		);

		if (exist.length === 0) {
			const query =
				"INSERT INTO barber_shop.Barbershop (name, location) VALUES (?, ?)";
			const data = [name, location];

			const response = await executeQuery(query, data);

			if (response) {
				return response;
			} else {
				return "Error creating barbershop";
			}
		} else {
			return "Barbershop existed";
		}
	} catch (error) {
		return error;
	}
};

const update = async ({ barbershopId, name, location }) => {
	try {
		let query = "UPDATE barber_shop.Barbershop SET ";
		const data = [];

		if (name) {
			query += "name = ?, ";
			data.push(name);
		}
		if (location) {
			query += "location = ?, ";
			data.push(location);
		}

		query = query.slice(0, -2) + " WHERE id = ?";
		data.push(barbershopId);

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error updating barbershop";
		}
	} catch (error) {
		return error;
	}
};

const remove = async (barbershopId) => {
	try {
		const query = "DELETE FROM barber_shop.Barbershop WHERE id = ?";
		const data = [barbershopId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error deleting barbershop";
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
