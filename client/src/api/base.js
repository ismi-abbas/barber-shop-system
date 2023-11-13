import axios from "axios";

const baseUrl = "http://localhost:5640";
const token = sessionStorage.getItem("token");

const apiClient = axios.create({
	baseURL: baseUrl,
	headers: {
		"Content-Type": "application/json",
		Authorization: "Bearer " + token,
	},
});

export default apiClient;
