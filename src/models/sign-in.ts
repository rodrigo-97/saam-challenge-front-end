import z from "zod";
import { t } from "@/configs";

export const signInSchema = z.object({
	username: z
		.string()
		.min(2, t("errors.validations.MIN_LENGTH", { min: 2 }))
		.max(255, t("errors.validations.REQUIRED_FIELD", { max: 255 })),
	password: z
		.string()
		.min(4, t("errors.validations.MIN_LENGTH", { min: 8 }))
		.max(32, t("errors.validations.REQUIRED_FIELD", { max: 32 })),
});

export type SignIn = z.input<typeof signInSchema>;
