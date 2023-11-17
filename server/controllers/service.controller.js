const { findAll } = require("../models/service.model");
const utils = require("../utils");

const getAllServices = async () => {
	try {
		const response = await findAll();

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError(error);
	}
};

module.exports = {
	getAllServices,
};
