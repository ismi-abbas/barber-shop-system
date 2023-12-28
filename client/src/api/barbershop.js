import apiClient from "./base";

export const getAllShop = async () => {
	const response = await apiClient.get("/shop");

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting barbers");
	}
};

export const getBarberShopInfo = async (shopId) => {
	const response = await apiClient.get(`/shop/${shopId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting shop info");
	}
};

export const getBarberList = async (shopId) => {
	const response = await apiClient.get(`/shop/barber/${shopId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting shop barber");
	}
};

export const getBarberService = async () => {};

export const getAllBarbers = async () => {
	const response = await apiClient.get(`/barber`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting all");
	}
};

export const getShopBarber = async (barbershopId) => {
	const response = await apiClient.get(`/barber/shop/${barbershopId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting all");
	}
};

export const editBarber = async ({ barberId, name, phone }) => {
	const response = await apiClient.put("/barber/update", {
		id: barberId,
		name,
		phone
	});

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed updating barber");
	}
};

export const addBarber = async ({ name, phone, email, shopId }) => {
	try {
		const response = await apiClient.post("/barber/create", {
			name,
			phone,
			email,
			shopId
		});

		if (response.status === 201) {
			return response.data;
		} else {
			throw new Error("Failed adding barber");
		}
	} catch (error) {
		throw new Error(`Error adding barber: ${error.message}`);
	}
};

export const deleteBarber = async ({ barberId }) => {
	try {
		const response = await apiClient.delete(`/barber/${barberId}`);
		return response.data;
	} catch (error) {
		throw new Error(`Error deleting barber: ${error.message}`);
	}
};

export const createShop = async ({ name, location, managerId }) => {
	const response = await apiClient.post("/shop/create", {
		name,
		location,
		managerId
	});

	if (response.status === 201) {
		sessionStorage.setItem("shopId", response.data.data.shopId);
		const { shopId } = response.data.data;
		return shopId;
	} else {
		throw new Error("Failed creating shop");
	}
};

export const getShopItems = async (shopId) => {
	const response = await apiClient.get(`/shop/items/${shopId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting shop items");
	}
};

export const addShopItem = async ({ shopId, item }) => {
	const body = {
		shopId,
		item_name: item.item_name,
		price: item.price,
		quantity: item.quantity
	};
	console.log(body);
	const response = await apiClient.post(`/shop/items/add`, body);

	if (response.status === 201) {
		return response.data;
	} else {
		throw new Error("Failed adding shop item");
	}
};

export const deleteShopItem = async ({ shopId, itemId }) => {
	const response = await apiClient.delete(
		`/shop/items/delete/${shopId}/${itemId}`
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed deleting shop item");
	}
};

export const updateShopItem = async ({ itemId, itemData }) => {
	const response = await apiClient.put(`/shop/items/update/${itemId}`, {
		item_name: itemData.item_name,
		price: itemData.price,
		quantity: itemData.quantity
	});

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed updating shop item");
	}
};

// Inventory Item
export const addInventoryItem = async ({ shopId, inventoryItem }) => {
	const body = {
		shopId,
		item_name: inventoryItem.inventory_name,
		quantity: inventoryItem.quantity
	};
	const response = await apiClient.post(`/shop/inventory/add`, body);

	if (response.status === 201) {
		return response.data;
	} else {
		throw new Error("Failed adding shop item");
	}
};

export const getInventoryItems = async (shopId) => {
	console.log({ shopId });
	const response = await apiClient.get(`/shop/inventory/${shopId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting shop items");
	}
};

export const deleteInventoryItem = async ({ shopId, itemId }) => {
	const response = await apiClient.delete(
		`/shop/inventory/delete/${shopId}/${itemId}`
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed deleting shop item");
	}
};

export const updateInventoryItem = async ({
	shopId,
	itemId,
	inventoryItem
}) => {
	const body = {
		shopId,
		item_name: inventoryItem.inventory_name,
		quantity: inventoryItem.quantity
	};
	const response = await apiClient.put(
		`/shop/inventory/update/${shopId}/${itemId}`,
		body
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed updating shop item");
	}
};
