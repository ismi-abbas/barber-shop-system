const barberModel = require("../models/barber.models");
const utils = require("../utils");

const getAll = async () => {
	try {
		const data = await barberModel.findAll();
		return data;
	} catch (error) {
		throw new Error("Error finding all barbers");
	}
};

const getById = async (barberId) => {
	try {
		const response = (await barberModel.findById(barberId))[0];

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error getting barber info");
	}
};

const createBarber = async (data) => {
	const { password } = data;
	const hashedPassword = await utils.createHashPassword(password);

	data.password = hashedPassword;
	try {
		const response = await barberModel.create(data);

		if (response.data) {
			return utils.prepareResponse(response, 200, "success");
		} else if (response === "User existed") {
			return utils.prepareResponse(response, 400, "failed");
		}
	} catch (error) {
		utils.handleError("Error creating barber");
		return error;
	}
};

const updateBarber = async (data) => {
	try {
		const response = await barberModel.update(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error updating barber");
		return error;
	}
};

const deleteBarber = async (barberId) => {
	try {
		const response = await barberModel.remove(barberId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

module.exports = {
	getAll,
	getById,
	createBarber,
	updateBarber,
	deleteBarber,
};
