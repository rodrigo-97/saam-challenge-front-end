import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/employees")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="w-full md:max-w-3/5">
			<Outlet />
		</div>
	);
}
