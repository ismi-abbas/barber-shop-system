const barberModel = require("../models/barber.model");
const utils = require("../utils");

const getAll = async () => {
	try {
		const response = await barberModel.findAll();

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error);
	}
};

const getById = async (barberId) => {
	try {
		const response = (await barberModel.findById(barberId))[0];

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		return utils.handleError(error);
	}
};

const createBarber = async (data) => {
	const { password } = data;
	const hashedPassword = await utils.hashPasssword(password);

	data.password = hashedPassword;
	try {
		const response = await barberModel.create(data);

		if (response.data) {
			return utils.prepareResponse(response, 200, "success");
		} else if (response === "User existed") {
			return utils.prepareResponse(response, 400, "failed");
		}
	} catch (error) {
		return utils.handleError(error);
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
