import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import type React from "react";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "@/components";
import { t } from "@/configs";
import { showApiError, showApiSuccess } from "@/helpers";
import { type CreateEmployee, employeeSchema } from "@/models";
import type { RemoteEmployee } from "@/remotes/models";
import {
	useCreateEmployee,
	useUpdateEmployee,
} from "@/remotes/services/employees";

type Props = {
	initialValues?: RemoteEmployee;
};

export const EmployeeForm: React.FC<Props> = ({ initialValues }) => {
	const navigate = useNavigate();

	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<CreateEmployee>({
		resolver: zodResolver(employeeSchema),
		defaultValues: {
			name: "",
			admissionDate: dayjs().toDate(),
			salary: undefined,
			active: true,
		},
	});

	const fields = useWatch({ control });

	const { createEmployee } = useCreateEmployee({
		onSuccess: () => {
			showApiSuccess("employees", "create");
			navigate({
				to: "/employees",
			});
		},
		onError: (err) => {
			showApiError(err);
		},
	});

	const { updateEmployee } = useUpdateEmployee({
		onSuccess: () => {
			showApiSuccess("employees", "update");
			navigate({
				to: "/employees",
			});
		},
		onError: (err) => {
			showApiError(err);
		},
	});

	const handleChange = (field: keyof CreateEmployee, value: any) => {
		setValue(field, value, { shouldValidate: true });
	};

	const onSubmit = handleSubmit((data) => {
		if (initialValues) {
			return updateEmployee({ id: initialValues.id, ...data });
		}

		return createEmployee(data);
	});

	useEffect(() => {
		if (initialValues) {
			setValue("active", initialValues.active);
			setValue("admissionDate", dayjs(initialValues.admissionDate).toDate());
			setValue("name", initialValues.name);
			setValue("salary", initialValues.salary);
		}
	}, [initialValues, setValue]);

	return (
		<div className="flex flex-col gap-2">
			<Input
				value={fields.name}
				label={t("pages.employees.fields.name.label")}
				placeholder={t("pages.employees.fields.name.placeholder")}
				error={errors.name?.message}
				onChange={(e) => handleChange("name", e.target.value)}
			/>

			<Input
				value={
					fields.admissionDate
						? dayjs(fields.admissionDate).format("YYYY-MM-DD")
						: ""
				}
				type="date"
				label={t("pages.employees.fields.admissionDate.label")}
				placeholder={t("pages.employees.fields.admissionDate.placeholder")}
				error={errors.admissionDate?.message}
				onChange={(e) =>
					handleChange("admissionDate", dayjs(e.target.value).toDate())
				}
			/>

			<Input
				value={fields.salary}
				type="number"
				label={t("pages.employees.fields.salary.label")}
				placeholder={t("pages.employees.fields.salary.placeholder")}
				error={errors.salary?.message}
				onChange={(e) => handleChange("salary", Number(e.target.value))}
			/>

			<fieldset className="fieldset rounded-box">
				<label className="label">
					<input
						type="checkbox"
						className="checkbox"
						checked={fields.active}
						onChange={(e) => handleChange("active", e.target.checked)}
					/>
					{t("pages.employees.fields.active.label")}
				</label>
			</fieldset>

			<button type="button" className="btn btn-primary mt-5" onClick={onSubmit}>
				{t("labels.save")}
			</button>
		</div>
	);
};
