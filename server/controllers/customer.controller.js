const booking = require("../models/customer.model");
const utils = require("../utils");

const getAllCustomers = async () => {
	try {
		const data = await booking.findAll();
		return data;
	} catch (error) {
		throw new Error("Error finding all bookings");
	}
};

const getCustomerById = async (barberId) => {
	try {
		const data = await booking.findById(barberId);
	} catch (error) {
		utils.handleError("Error getting booking info");
	}
};

const createCustomer = async (data) => {
	try {
		const response = await booking.create(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error creating booking");
		return error;
	}
};

const updateCustomer = async (data) => {
	try {
		const response = await booking.update(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error updating booking");
		return error;
	}
};

const deleteCustomer = async (barberId) => {
	try {
		const response = await booking.remove(barberId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting booking");
		return error;
	}
};

module.exports = {
	getAllCustomers,
	getCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
};
