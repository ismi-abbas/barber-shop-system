const barberShop = require("../models/barbershop.model");
const utils = require("../utils");

const getAllBarbershop = async () => {
	try {
		const data = await barberShop.findAll();
		return utils.prepareResponse(data, 200, "success");
	} catch (error) {
		throw new Error("Error finding all barbers");
	}
};

const getBarberShopById = async (barberId) => {
	try {
		const data = await barberShop.findById(barberId);
		if (data.length > 0) {
			return utils.prepareResponse(data, 200, "success");
		} else {
			return utils.prepareResponse(null, 404, "No record found");
		}
	} catch (error) {
		utils.handleError("Error getting barber info");
	}
};

const getBarberList = async (shopId) => {
	try {
		const data = await barberShop.getBarberList(shopId);

		if (data.length > 0) {
			return utils.prepareResponse(data, 200, "success");
		} else {
			return utils.prepareResponse(null, 404, "No record found");
		}
	} catch (error) {
		utils.handleError("Error getting barber info");
	}
};

const createBarbershop = async (data) => {
	try {
		const response = await barberShop.create(data);

		if (response.data) {
			return utils.prepareResponse(response, 200, "success");
		} else {
			return utils.prepareResponse(
				response,
				400,
				"Error creating barbershop"
			);
		}
	} catch (error) {
		return utils.handleError("Error creating barber");
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
	getBarberList,
};
