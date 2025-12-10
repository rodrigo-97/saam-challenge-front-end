import z from "zod";
import { t } from "@/configs";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;

export const signUpSchema = z
	.object({
		username: z
			.string()
			.min(2, t("errors.validations.MIN_LENGTH", { min: 2 }))
			.max(255, t("errors.validations.MAX_LENGTH", { max: 255 })),
		email: z
			.email(t("errors.validations.INVALID_EMAIL"))
			.max(255, t("errors.validations.MAX_LENGTH", { max: 255 })),
		firstName: z
			.string()
			.min(1, t("errors.validations.REQUIRED_FIELD"))
			.max(255, t("errors.validations.MAX_LENGTH", { max: 255 })),
		lastName: z
			.string()
			.min(1, t("errors.validations.REQUIRED_FIELD"))
			.max(255, t("errors.validations.MAX_LENGTH", { max: 255 })),
		password: z
			.string()
			.min(8, t("errors.validations.MIN_LENGTH", { min: 8 }))
			.max(32, t("errors.validations.MAX_LENGTH", { max: 32 }))
			.regex(passwordRegex, t("errors.validations.PASSWORD_COMPLEXITY")),
		confirmPassword: z
			.string()
			.min(8, t("errors.validations.MIN_LENGTH", { min: 8 }))
			.max(32, t("errors.validations.MAX_LENGTH", { max: 32 }))
			.regex(passwordRegex, t("errors.validations.PASSWORD_COMPLEXITY")),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: t("errors.validations.PASSWORDS_DONT_MATCH"),
		path: ["confirmPassword"],
	});

export type SignUp = z.infer<typeof signUpSchema>;
