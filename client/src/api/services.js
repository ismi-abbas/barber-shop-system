import apiClient from "./base";

export const getServices = async () => {
	const response = await apiClient.get(`/service/`);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error("Failed getting services");
	}
};
