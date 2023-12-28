const barberShop = require("../models/barbershop.model");
const utils = require("../utils");
const { logger } = require("../utils/logger");

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

		if (response.insertId) {
			response.shopId = response.insertId;
			return utils.prepareResponse(response, 201, "success");
		} else {
			return utils.prepareResponse(response, 400, "Error creating barbershop");
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

const uploadImage = async (originalName, buffer) => {
	try {
		const response = await barberShop.uploadImage(originalName, buffer);
		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const getImage = async (imageId) => {
	try {
		const response = await barberShop.getImage(imageId);
		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const getShopItems = async (shopId) => {
	try {
		const response = await barberShop.getShopItems(shopId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const getAllShopItems = async () => {
	try {
		const response = await barberShop.getAllShopItems();

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error gettings all shops");
		return error;
	}
};

const addShopItem = async (itemData) => {
	try {
		const response = await barberShop.addShopItem(itemData);

		if (response) {
			return utils.prepareResponse(response, 201, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const removeShopItem = async (shopId, itemId) => {
	try {
		const response = await barberShop.deleteShopItem({
			shopId,
			itemId
		});

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting shop item");
		return error;
	}
};

const updateShopItem = async (itemData) => {
	try {
		const response = await barberShop.updateShopItem(itemData);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error updating shop item");
		return error;
	}
};

const getInventoryItems = async (shopId) => {
	try {
		const response = await barberShop.getInventoryItems(shopId);

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error getting barber list");
		return error;
	}
};

const addInventoryItem = async (itemData) => {
	try {
		const response = await barberShop.addInventory(itemData);

		if (response) {
			return utils.prepareResponse(response, 201, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const deleteInventoryItem = async (shopId, itemId) => {
	try {
		const response = await barberShop.removeInventory({
			itemId,
			barbershopId: shopId
		});

		if (response) {
			return utils.prepareResponse(response, 200, "success");
		}
	} catch (error) {
		utils.handleError("Error deleting barber");
		return error;
	}
};

const updateInventoryItem = async (itemData) => {
	try {
		console.log("ITEM DATA", itemData);
		const response = await barberShop.updateInventory(itemData);

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
	uploadImage,
	getImage,
	getShopItems,
	getAllShopItems,
	addShopItem,
	updateShopItem,
	removeShopItem,
	getInventoryItems,
	addInventoryItem,
	deleteInventoryItem,
	updateInventoryItem
};
