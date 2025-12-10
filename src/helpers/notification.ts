import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { t } from "@/configs";

type Mode = "create" | "update" | "delete" | "activate" | "deactivate";

export const showApiSuccess = (page: string, mode: Mode) => {
	toast.success(t(`pages.${page}.notifications.${mode}`));
};

export const showApiError = (
	error: AxiosError<ApiErrorResponse>,
	i18nDetails?: Record<string, unknown>,
) => {
	const status = error.response?.status;
	const apiMessage = error.response?.data?.message;

	const message =
		([400, 404, 500].includes(status ?? 0) ? status : null) ??
		apiMessage ??
		"UNKNOWN_ERROR";

	console.log(`errors.api.${message}`);

	toast.error(t(`errors.api.${message}`, { ...i18nDetails }));
};
