const { executeQuery } = require("../utils/db");
const { logger } = require("../utils/logger");

const findAll = async () => {
	try {
		const query = `SELECT * FROM Services;`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching services: ${error.message}`);
	}
};

module.exports = {
	findAll
};
