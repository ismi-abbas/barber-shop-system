import apiClient from "./base";

export const addToSales = async ({
	barbershopId,
	date,
	bookingId,
	amount,
	serviceId,
	barberId,
	paymentStatus
}) => {
	const body = {
		barbershopId,
		date,
		bookingId,
		amount,
		serviceId,
		barberId,
		paymentStatus
	};

	const response = await apiClient.post("/sales/order/create", body);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed adding booking");
	}
};
