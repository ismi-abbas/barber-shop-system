const booking = require("../models/booking.model");
const utils = require("../utils");

const getAllBookings = async () => {
	try {
		const data = await booking.findAll();
		return data;
	} catch (error) {
		throw new Error("Error finding all barbers");
	}
};

const getBookingById = async (barberId) => {
	try {
		const data = await booking.findById(barberId);
	} catch (error) {
		utils.handleError("Error getting barber info");
	}
};

const createBooking = async (data) => {
	try {
		const response = await booking.create(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error creating barber");
		return error;
	}
};

const updateBooking = async (data) => {
	try {
		const response = await booking.update(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error updating barber");
		return error;
	}
};

const deleteBooking = async (barberId) => {
	try {
		const response = await booking.remove(barberId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const getByCustomerId = async (customerId) => {
	try {
		const response = await booking.findByCustomerId(customerId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {}
};

module.exports = {
	getAllBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking,
	getByCustomerId,
};
