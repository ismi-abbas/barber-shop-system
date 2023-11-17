import apiClient from "./base";

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
		let url = `/customer/login`;

		if (userData.isManager) {
			url = `/manager/login`;
		}

		const response = await apiClient.post(url, userData);

		if (response.status === 200) {
			const responseData = response.data.data;
			sessionStorage.setItem("token", responseData.token);
			sessionStorage.setItem("userId", responseData.id);
			sessionStorage.setItem("shopId", responseData.barbershop_id);
			sessionStorage.setItem(
				"isManager",
				(!!responseData.barbershop_id).toString()
			);
			return response.data;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		throw error.response.data;
	}
};
