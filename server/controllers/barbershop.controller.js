const barberShop = require("../models/barbershop.model");
const utils = require("../utils");

const getAllBarbershop = async () => {
	try {
		const data = await barberShop.findAll();
		return data;
	} catch (error) {
		throw new Error("Error finding all barbers");
	}
};

const getBarberShopById = async (barberId) => {
	try {
		const data = await barberShop.findById(barberId);
	} catch (error) {
		utils.handleError("Error getting barber info");
	}
};

const createBarbershop = async (data) => {
	const { password } = data;
	const hashedPassword = await utils.createHashPassword(password);

	data.password = hashedPassword;
	try {
		const response = await barberShop.create(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error creating barber");
		return error;
	}
};

const updateBarbershop = async (data) => {
	try {
		const response = await barberShop.update(data);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error updating barber");
		return error;
	}
};

const deleteBarbershop = async (barberId) => {
	try {
		const response = await barberShop.remove(barberId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

module.exports = {
	getAllBarbershop,
	getBarberShopById,
	createBarbershop,
	updateBarbershop,
	deleteBarbershop,
};
