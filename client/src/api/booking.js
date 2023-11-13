import apiClient from "./base";

export const addBooking = async ({ barberId, customerId, barbershopId }) => {
	const body = {
		barberId,
		customerId,
		barbershopId,
		status: "pending",
	};
	try {
		const response = await apiClient.post("/booking/add", body);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed adding booking");
		}
	} catch (error) {
		throw error;
	}
};

export const getUserBooking = async (userId) => {
	try {
		const response = await apiClient.get(`/booking/customer/${userId}`);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed getting user booking");
		}
	} catch (error) {
		throw error;
	}
};
