import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employees/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/employees/create"!</div>;
}
