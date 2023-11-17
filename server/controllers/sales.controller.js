const salesModel = require("../models/sales.model");
const utils = require("../utils");

const getAllSales = async () => {
	try {
		const response = await salesModel.findAll();

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

const addToSales = async (data) => {
	try {
		const response = await salesModel.addOrder(data);
		if (response) {
			return utils.prepareResponse(response, 200, "success");
		} else if (response === "Order existed") {
			return utils.prepareResponse(response, 400, "failed");
		}
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

module.exports = {
	addToSales,
	getAllSales,
};
