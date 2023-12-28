const { executeQuery } = require("../utils/db");
const logger = require("../utils/logger");

const create = async (managerData) => {
	try {
		const { name, email, phone, password, barbershop_id } = managerData;

		const exist = await executeQuery(
			"SELECT * FROM barber_shop.manager WHERE name = ? AND email = ?;",
			[name, email]
		);

		if (exist.length === 0) {
			const query = `
        INSERT INTO barber_shop.manager (name, email, phone, password, barbershop_id)
        VALUES (?, ?, ?, ?, ?)
      `;

			const data = [name, email, phone, password, barbershop_id];

			const response = await executeQuery(query, data);

			if (response.insertId) {
				return response.insertId;
			} else {
				throw new Error("Error creating manager");
			}
		} else {
			throw new Error("Manager with this email already exists");
		}
	} catch (error) {
		throw error;
	}
};

const login = async (email) => {
	try {
		const query = `
      SELECT id, name, email, barbershop_id, phone, password
      FROM barber_shop.manager
      WHERE email = ?
    `;

		const data = [email];

		const response = await executeQuery(query, data);

		if (response.length > 0) {
			return response[0];
		} else {
			throw new Error("Manager not found");
		}
	} catch (error) {
		throw error;
	}
};

module.exports = {
	create,
	login
};
