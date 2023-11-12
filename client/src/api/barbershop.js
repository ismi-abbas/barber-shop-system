import axios from "axios";
import { baseUrl, token } from "./users";

export const getAllBarber = async () => {
	try {
		const response = await axios.get(`${baseUrl}/shop`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response;
	} catch (error) {
		throw error;
	}
};
