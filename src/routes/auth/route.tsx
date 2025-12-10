import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-dvh w-dvw flex justify-center items-center">
			<main className="max-w-lg w-full p-5 rounded-lg">
				<div className="card w-full max-w-md shadow-xl bg-base-300 p-12">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
