import { createFileRoute } from "@tanstack/react-router";
import { EmployeeForm } from "./@components/form";

export const Route = createFileRoute("/employees/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4 text-left">
				Criar Novo Funcionário
			</h1>

			<p className="text-left text-sm text-base-content/70 mb-6">
				Preencha os campos abaixo para adicionar um novo funcionário ao sistema.
				Verifique os dados antes de salvar.
			</p>

			<EmployeeForm />
		</div>
	);
}
