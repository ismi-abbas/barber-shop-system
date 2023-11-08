const { logger } = require("./logger");
const bcrypt = require("bcrypt");

const prepareResponse = (data, statusCode, message) => {
	return {
		statusCode,
		data,
		message,
	};
};

const handleError = (error, statusCode, message) => {
	logger.error("An error occurred " + error);

	return prepareResponse(
		error,
		statusCode,
		message ?? "Internal Server Error"
	);
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

const comparePasswords = (plainPassword, hashedPassword) => {
	return bcrypt.compareSync(plainPassword, hashedPassword);
};

const hashPasssword = async (password) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hashedPassword = bcrypt.hashSync(password, salt);
	return { salt, password: hashedPassword };
};

module.exports = {
	prepareResponse,
	handleError,
	handleExceptions,
	hashPasssword,
	comparePasswords,
};
