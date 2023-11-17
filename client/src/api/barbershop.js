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
