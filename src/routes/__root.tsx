import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createRootRoute({
	beforeLoad: async () => {
		const token = localStorage.getItem("accessToken");
		const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

		if (!token) {
			const currentPath = window.location.pathname;

			if (!publicRoutes.includes(currentPath)) {
				throw redirect({
					to: "/auth/sign-in",
					replace: true,
				});
			}
		}
	},

	component: RootComponent,
});

function RootComponent() {
	return <Outlet />;
}
