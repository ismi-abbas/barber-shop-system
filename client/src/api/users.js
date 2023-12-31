import apiClient from "./base";

// Customer
export const registerUser = async (userData) => {
	const response = await apiClient.post(`/customer/create`, userData);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed to register user");
	}
};

export const login = async (userData) => {
	try {
		const response = await apiClient.post("/customer/login", userData);

		if (response.status === 200) {
			const responseData = response.data.data;
			sessionStorage.setItem("token", responseData.token);
			sessionStorage.setItem("userId", responseData.id);
			sessionStorage.setItem("isManager", false);
			return response.data;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		throw error.response.data;
	}
};
