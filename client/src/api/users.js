import axios from "axios";

export const baseUrl = "http://localhost:5640";

export const token = sessionStorage.getItem("token");

export const registerUser = async (userData) => {
	try {
		const response = await axios.post(`${baseUrl}/customer/create`, userData, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		});

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed to register user");
		}
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};

export const login = async (userData) => {
	try {
		const response = await axios.post(`${baseUrl}/customer/login`, userData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200) {
			const token = response.data.data.token;
			sessionStorage.setItem("token", token);
			return response.data;
		} else {
			throw new Error("Failed to login");
		}
	} catch (error) {
		throw error.response.data;
	}
};
