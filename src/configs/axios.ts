import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:8080",
	timeout: 5000,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");

		const path = window.location.pathname;
		const isAuthRoute = path.startsWith("/auth/");

		if (token && !isAuthRoute) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;
		const path = window.location.pathname;

		const isAuthRoute = path.startsWith("/auth/");

		if (status === 401 && !isAuthRoute) {
			window.location.href = "/auth/sign-in";
		}

		return Promise.reject(error);
	},
);
