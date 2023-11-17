import apiClient from "./base";

export const getServices = async () => {
	try {
		const response = await apiClient.get(`/service/`);

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error("Failed getting services");
		}
	} catch (error) {
		throw error;
	}
};
