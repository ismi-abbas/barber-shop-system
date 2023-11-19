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
		throw new Error("Failed adding sales order");
	}
};

export const updateSale = async ({ paymentStatus, salesId }) => {
	const response = await apiClient.put(`/sales/order/update/${salesId}`, {
		paymentStatus
	});

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed updating sales order");
	}
};

export const getRevenue = async (type) => {
	const response = await apiClient.get(`/sales/revenue/${type}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting revenue record");
	}
};

export const getSalesInfo = async (bookingId) => {
	const response = await apiClient.get(`/sales/booking/${bookingId}`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting sales record");
	}
};
