import apiClient from "./base";

export const registerUser = async (userData) => {
	try {
		const response = await apiClient.post(`/customer/create`, userData);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed to register user");
		}
	} catch (error) {
		throw error;
	}
};

export const login = async (userData) => {
	try {
		let url = `/customer/login`;

		if (userData.isManager) {
			url = `/manager/login`;
		}

		const response = await apiClient.post(url, userData);

		if (response.status === 200) {
			const responseData = response.data.data;
			sessionStorage.setItem("token", responseData.token);
			sessionStorage.setItem("userId", responseData.id);
			sessionStorage.setItem(
				"isManager",
				responseData.barbershop_id ? true : false
			);
			return response.data;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		throw error.response.data;
	}
};
