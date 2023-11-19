import apiClient from "./base";

export const addBooking = async ({
	barberId,
	customerId,
	barbershopId,
	serviceId,
	servicePrice,
	date,
	status
}) => {
	const body = {
		barberId,
		customerId,
		barbershopId,
		serviceId,
		servicePrice,
		date,
		status
	};

	const response = await apiClient.post("/booking/create", body);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed adding booking");
	}
};

export const getUserBooking = async (userId) => {
	const response = await apiClient.get(`/booking/customer/${userId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting user booking");
	}
};

export const getAllAppointments = async (shopId) => {
	const response = await apiClient.get(`/manager/getBookings/${shopId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting user booking");
	}
};

export const updateBooking = async (data) => {
	const response = await apiClient.put("booking/update", data);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Error approving user booking");
	}
};
