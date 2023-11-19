const salesModel = require("../models/sales.model");
const utils = require("../utils");

const getAllSales = async () => {
	try {
		const response = await salesModel.findAll();

		return utils.prepareResponse(response, 200, "success");
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

const addToSales = async (data) => {
	try {
		const response = await salesModel.addOrder(data);

		if (response === "Order existed") {
			return utils.prepareResponse(response, 400, "failed");
		}
		return utils.prepareResponse(response, 200, "success");
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

const getRevenue = async (type) => {
	try {
		const response = await salesModel.getRevenue(type);

		console.log(response);

		return utils.prepareResponse(response, 200, "success");
	} catch (error) {}
};

const getByBookingId = async (bookingId) => {
	try {
		const response = await salesModel.findByBookingId(bookingId);

		return utils.prepareResponse(response, 200, "success");
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

const updateSale = async (salesId, paymentStatus) => {
	try {
		const response = await salesModel.update(salesId, paymentStatus);
		console.log(response);

		return utils.prepareResponse(response, 200, "success");
	} catch (error) {
		return utils.handleError(error, 500);
	}
};

module.exports = {
	addToSales,
	getAllSales,
	getRevenue,
	getByBookingId,
	updateSale,
};
