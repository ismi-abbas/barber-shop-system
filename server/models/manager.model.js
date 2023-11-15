const { executeQuery } = require("../utils/db");

const login = async (email) => {
	try {
		const query = `SELECT id, name, email, barbershop_id, phone, password from Manager WHERE email = ?`;
		const data = [email];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error deleting customer";
		}
	} catch (error) {}
};

module.exports = {
	login,
};
