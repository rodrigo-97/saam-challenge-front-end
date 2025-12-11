import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { t } from "@/configs";

type Mode = "create" | "update" | "delete" | "activate" | "deactivate";

export const showApiSuccess = (page: string, mode: Mode) => {
	toast.success(t(`pages.${page}.notifications.${mode}`));
};

export const showApiError = (error: AxiosError<ApiErrorResponse>) => {
	const apiMessage = error.response?.data?.message;
	toast.error(t(`errors.api.${apiMessage}`));
};
