import apiClient from "./base";

export const registerManager = async (managerData) => {
	const response = await apiClient.post(`/manager/create`, managerData);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed to register user");
	}
};

export const login = async (userData) => {
	try {
		const response = await apiClient.post("/manager/login", userData);

		if (response.status === 200) {
			const responseData = response.data.data;
			sessionStorage.setItem("token", responseData.token);
			sessionStorage.setItem("userId", responseData.id);
			sessionStorage.setItem(
				"shopId",
				responseData.barbershop_id ? responseData.barbershop_id : null
			);
			sessionStorage.setItem("isManager", true);
			return response.data;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		throw error.response.data;
	}
};
