import apiClient from "./base";

export const getStoreItems = async () => {
	const response = await apiClient.get("/shop/items/getAll");

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting revenue record");
	}
};

export const addStoreSales = async ({
	customerId,
	itemId,
	quantity,
	total,
	barbershopId
}) => {
	const response = await apiClient.post("/store/sales", {
		customerId,
		itemId,
		quantity,
		total,
		barbershopId
	});

	if (response.status === 201) {
		return response.data;
	} else {
		throw new Error("Failed getting revenue record");
	}
};

export const getStoreRevenue = async (shopId, type) => {
	const response = await apiClient.get(`/store/revenue/${shopId}/${type}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting revenue record");
	}
};
