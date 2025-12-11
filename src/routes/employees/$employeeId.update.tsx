import { createFileRoute, useParams } from "@tanstack/react-router";
import { useFetchEmployee } from "@/remotes/services/employees";
import { EmployeeForm } from "./@components/form";

export const Route = createFileRoute("/employees/$employeeId/update")({
	component: RouteComponent,
});

function RouteComponent() {
	const employeeId = useParams({
		from: "/employees/$employeeId/update",
		select: (params) => Number(params.employeeId),
	});

	const { employee } = useFetchEmployee({ id: employeeId });

	return (
		<div>
			<h1 className="text-3xl font-bold mb-4 text-left">
				Atualizar Funcionário
			</h1>

			<p className="text-left text-sm text-base-content/70 mb-6">
				Edite os campos abaixo para atualizar as informações do funcionário.
				Verifique os dados antes de salvar.
			</p>

			<EmployeeForm initialValues={employee} />
		</div>
	);
}
