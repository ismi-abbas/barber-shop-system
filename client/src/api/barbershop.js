import apiClient from "./base";

export const getAllBarber = async () => {
	try {
		const response = await apiClient.get("/shop");

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed getting barbers");
		}
	} catch (error) {
		throw error;
	}
};

export const getBarberShopInfo = async (shopId) => {
	try {
		const response = await apiClient.get(`/shop/${shopId}`);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed getting shop info");
		}
	} catch (error) {
		throw error;
	}
};

export const getBarberList = async (shopId) => {
	try {
		const response = await apiClient.get(`/shop/barber/${shopId}`);

		if (response.status === 200) {
			console.log("responseData", response.data);
			return response.data;
		} else {
			throw new Error("Failed getting shop barber");
		}
	} catch (error) {
		throw error;
	}
};
