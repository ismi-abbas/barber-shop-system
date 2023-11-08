import axios from "axios";

export const registerUser = async (userData) => {
	try {
		const response = await axios.post(
			"http://localhost:5640/api/customer/create",
			userData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 200) {
			console.log("Data:", response.data);
			return response.data; // You might want to return the data or a specific response here
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
		const response = await axios.post(
			"http://localhost:5640/customer/login",
			userData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

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
