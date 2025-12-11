import { NotePencilIcon, TrashIcon } from "@phosphor-icons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import { Pagination, Table } from "@/components";
import { t } from "@/configs";
import { formatBRL, showApiError, showApiSuccess } from "@/helpers";
import {
	useActivateEmployee,
	useDeactivateEmployee,
	useDeleteEmployee,
	useFetchEmployees,
} from "@/remotes/services/employees";

export const Route = createFileRoute("/employees/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const [paginationParams, setPaginationParams] = useState<PaginationParams>({
		page: 1,
		size: 10,
	});
	const { employees, pagination, refetch } =
		useFetchEmployees(paginationParams);

	const { deactivateEmployee } = useDeactivateEmployee({
		onSuccess: () => {
			showApiSuccess("employees", "deactivate");
			refetch();
		},
		onError: (err) => {
			showApiError(err);
		},
	});

	const { activateEmployee } = useActivateEmployee({
		onSuccess: () => {
			showApiSuccess("employees", "activate");
			refetch();
		},
		onError: (err) => {
			showApiError(err);
		},
	});

	const { deleteEmployee } = useDeleteEmployee({
		onSuccess: () => {
			showApiSuccess("employees", "delete");
			refetch();
		},
		onError: (err) => {
			showApiError(err);
		},
	});

	const toggleEmployee = (
		employeeId: number,
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		if (e.target.checked) {
			return activateEmployee(employeeId);
		}
		return deactivateEmployee(employeeId);
	};

	const navigateToCreateEmployee = () => {
		navigate({
			to: "/employees/create",
		});
	};

	const navigateToUpdateEmployee = (employeeId: number) => {
		navigate({
			to: "/employees/$employeeId/update",
			params: { employeeId: employeeId.toString() },
		});
	};

	const columns = [
		"#",
		t("pages.employees.columns.name"),
		t("pages.employees.columns.admissionDate"),
		t("pages.employees.columns.salary"),
		t("pages.employees.columns.active"),
		t("labels.actions"),
	];

	return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold"> {t("pages.employees.title")}</h1>
				<button
					type="button"
					className="btn btn-primary"
					onClick={navigateToCreateEmployee}
				>
					{t("pages.employees.add")}
				</button>
			</div>

			<Table
				columns={columns}
				data={employees}
				renderRow={(employee) => (
					<tr
						key={employee.id}
						className="hover:bg-base-300 cursor-pointer"
						title="Visualizar detalhes"
					>
						<th>{employee.id}</th>
						<td>{employee.name}</td>
						<td>{dayjs(employee.admissionDate).format("DD/MM/YYYY")}</td>
						<td>{formatBRL(employee.salary)}</td>
						<td>
							<input
								type="checkbox"
								className="checkbox checkbox-primary checkbox-sm"
								checked={employee.active}
								onChange={(e) => toggleEmployee(employee.id, e)}
							/>
						</td>
						<td className="flex gap-2">
							<button
								type="button"
								className="btn btn-sm btn-ghost btn-square"
								onClick={() => navigateToUpdateEmployee(employee.id)}
								title="Editar"
							>
								<NotePencilIcon className="w-4 h-4" />
							</button>
							<button
								type="button"
								className="btn btn-sm btn-ghost btn-square"
								onClick={() => deleteEmployee(employee.id)}
								title="Editar"
							>
								<TrashIcon className="w-4 h-4" />
							</button>
						</td>
					</tr>
				)}
			/>

			{pagination && (
				<div className="mt-8 flex justify-center">
					<Pagination
						pagination={pagination}
						onPageChange={(page) =>
							setPaginationParams((p) => ({ ...p, page }))
						}
					/>
				</div>
			)}
		</div>
	);
}
