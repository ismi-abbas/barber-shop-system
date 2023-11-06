const logger = require("./logger");
const bcrypt = require("bcrypt");

const prepareResponse = (data, statusCode, message) => {
	return {
		statusCode,
		data,
		message,
	};
};

const handleError = (error) => {
	logger.error("An error occurred" + error.message);

	return prepareResponse(error, 500, "Internal Server Error");
};

const handleExceptions = (func, params) => {
	try {
		const result = func(params);
		return result;
	} catch (error) {
		handleError(error);
		logger.error("An error occurred while processing the request");
		return "An error occurred while processing the request.";
	}
};

const createHashPassword = async (password) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		return hashedPassword;
	} catch (error) {
		return error;
	}
};

module.exports = {
	prepareResponse,
	handleError,
	handleExceptions,
	createHashPassword,
};
