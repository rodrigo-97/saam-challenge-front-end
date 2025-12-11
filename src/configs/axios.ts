import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8080",
	timeout: 5000,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			window.location.href = "/auth/sign-in";
		}
		return Promise.reject(error);
	},
);
