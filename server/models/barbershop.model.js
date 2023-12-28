const { executeQuery } = require("../utils/db");
const logger = require("../utils/logger");

const findAll = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Barbershop;`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		logger.error(`Error fetching barbershops: ${error.message}`);
	}
};

const findById = async (id) => {
	try {
		const query = `SELECT * FROM barber_shop.Barbershop WHERE id = ?;`;
		const data = [id];
		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			throw new Error();
		}
	} catch (error) {
		logger.error(`Error fetching barbershops: ${error.message}`);
	}
};

const create = async ({ name, location, managerId }) => {
	try {
		const exist = await executeQuery(
			"SELECT * FROM barber_shop.Barbershop WHERE name = ? AND location = ?",
			[name, location]
		);

		if (exist.length === 0) {
			const query =
				"INSERT INTO barber_shop.Barbershop (name, location) VALUES (?, ?)";
			const data = [name, location];

			const response = await executeQuery(query, data);

			if (response.insertId) {
				await executeQuery(
					"UPDATE Manager SET barbershop_id = ? WHERE id = ?",
					[response.insertId, managerId]
				);

				return response;
			} else {
				return "Error creating barbershop";
			}
		} else {
			return "Barbershop existed";
		}
	} catch (error) {
		return error;
	}
};

const update = async ({ barbershopId, name, location }) => {
	try {
		let query = "UPDATE barber_shop.Barbershop SET ";
		const data = [];

		if (name) {
			query += "name = ?, ";
			data.push(name);
		}
		if (location) {
			query += "location = ?, ";
			data.push(location);
		}

		query = query.slice(0, -2) + " WHERE id = ?";
		data.push(barbershopId);

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error updating barbershop";
		}
	} catch (error) {
		return error;
	}
};

const remove = async (barbershopId) => {
	try {
		const query = "DELETE FROM barber_shop.Barbershop WHERE id = ?";
		const data = [barbershopId];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error deleting barbershop";
		}
	} catch (error) {
		return error;
	}
};

const getBarberList = async (barbershopId) => {
	try {
		const query = `
		SELECT B.id, B.name, B.phone
		FROM barber_shop.Barbershop BS
				 INNER JOIN barber_shop.Barber B ON BS.id = B.barbershop_id
		WHERE BS.id = ? and B.availability = ?`;
		const data = [barbershopId, true];

		const response = await executeQuery(query, data);

		if (response) {
			return response;
		} else {
			return "Error getting barberlist";
		}
	} catch (error) {
		throw error;
	}
};

const uploadImage = async (originalName, buffer) => {
	try {
		const query = `INSERT INTO Images (name, data) VALUES (?, ?)`;
		const data = [originalName, buffer];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error getting barberlist";
		}
	} catch (error) {
		throw error;
	}
};

const getImage = async (imageId) => {
	try {
		const query = "SELECT * FROM Images WHERE id = ?";
		const data = [imageId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error getting barberlist";
		}
	} catch (error) {
		throw error;
	}
};

const getShopItems = async (shopId) => {
	try {
		const query = `SELECT * FROM barber_shop.Items WHERE barbershop_id = ?`;
		const data = [shopId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error getting barberlist";
		}
	} catch (error) {
		throw error;
	}
};

const getAllShopItems = async () => {
	try {
		const query = `SELECT * FROM barber_shop.Items`;
		const response = await executeQuery(query, null);
		return response;
	} catch (error) {
		throw error;
	}
};

const addShopItem = async ({ shopId, item_name, price, quantity }) => {
	try {
		const query = `INSERT INTO barber_shop.Items (barbershop_id, item_name, price, quantity) VALUES (?,?,?,?)`;
		const data = [shopId, item_name, price, quantity];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error adding shop item";
		}
	} catch (error) {
		throw error;
	}
};

const deleteShopItem = async ({ shopId, itemId }) => {
	try {
		const query = `DELETE FROM barber_shop.Items WHERE id = ? AND barbershop_id = ?`;
		const data = [itemId, shopId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error deleting shop item";
		}
	} catch (error) {
		throw error;
	}
};

const updateShopItem = async ({ itemId, item_name, quantity, price }) => {
	try {
		const query =
			"UPDATE barber_shop.Items SET item_name = ?, quantity = ?, price = ? WHERE id = ?";

		const data = [item_name, quantity, price, itemId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error updating shop item";
		}
	} catch (error) {
		throw error;
	}
};

const getInventoryItems = async (shopId) => {
	try {
		const query = `SELECT * FROM barber_shop.Inventory WHERE barbershop_id = ?`;
		const data = [shopId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error getting barberlist";
		}
	} catch (error) {
		throw error;
	}
};

const addInventory = async ({ shopId, item_name, quantity }) => {
	try {
		const query = `INSERT INTO barber_shop.Inventory (barbershop_id, inventory_name, quantity) VALUES (?,?,?)`;
		const data = [shopId, item_name, quantity];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error adding shop item";
		}
	} catch (error) {
		throw error;
	}
};

const removeInventory = async ({ itemId, barbershopId }) => {
	try {
		const query = `DELETE FROM barber_shop.Inventory WHERE id = ? and barbershop_id = ?`;
		const data = [itemId, barbershopId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error adding shop item";
		}
	} catch (error) {
		throw error;
	}
};

const updateInventory = async ({ itemId, item_name, quantity }) => {
	try {
		const query = `UPDATE barber_shop.Inventory SET inventory_name = ?, quantity = ? WHERE id = ?`;
		const data = [item_name, quantity, itemId];

		const response = await executeQuery(query, data);
		if (response) {
			return response;
		} else {
			return "Error updating inventory item";
		}
	} catch (error) {
		throw error;
	}
};

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove,
	getBarberList,
	uploadImage,
	getImage,
	getShopItems,
	getAllShopItems,
	addShopItem,
	deleteShopItem,
	updateShopItem,
	getInventoryItems,
	addInventory,
	removeInventory,
	updateInventory
};
