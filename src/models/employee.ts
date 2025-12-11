import z from "zod";
import { t } from "@/configs";

export const employeeSchema = z.object({
	name: z
		.string(t("errors.validations.REQUIRED_FIELD"))
		.min(2, t("errors.validations.MIN_LENGTH", { min: 2 }))
		.max(255, t("errors.validations.MAX_LENGTH", { max: 255 })),
	admissionDate: z.date(t("errors.validations.REQUIRED_FIELD")),
	salary: z
		.number(t("errors.validations.REQUIRED_FIELD"))
		.positive(t("errors.validations.POSITIVE_NUMBER")),
	active: z.boolean(t("errors.validations.REQUIRED_FIELD")).default(true),
});

export type CreateEmployee = z.input<typeof employeeSchema>;
export type UpdateEmployee = z.input<typeof employeeSchema> & { id: number };
