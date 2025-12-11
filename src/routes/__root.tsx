import { GearIcon, HouseIcon, ListIcon, X, XIcon } from "@phosphor-icons/react";
import {
	createRootRoute,
	Outlet,
	redirect,
	useLocation,
} from "@tanstack/react-router";
import { useState } from "react";
import { Content } from "./@components/content";

export const Route = createRootRoute({
	beforeLoad: async () => {
		const token = localStorage.getItem("accessToken");
		const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

		if (!token) {
			const currentPath = window.location.pathname;
			if (!publicRoutes.includes(currentPath)) {
				throw redirect({ to: "/auth/sign-in", replace: true });
			}
		}
	},

	component: RootComponent,
});

function RootComponent() {
	const location = useLocation();
	const isAuthRoute = location.pathname.startsWith("/auth/");

	if (isAuthRoute) {
		return <Outlet />;
	}

	return <Content />;
}
