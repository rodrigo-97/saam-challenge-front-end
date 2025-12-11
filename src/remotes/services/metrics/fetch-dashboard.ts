import { useQuery } from "@tanstack/react-query";
import { api } from "@/configs";
import type { RemoteDashboard } from "@/remotes/models";

export const useFetchDashboard = () => {
	const query = useQuery({
		queryKey: ["dashboard"],
		queryFn: async () => {
			const { data } = await api.get<RemoteDashboard>("/metrics/dashboard");
			return data;
		},
	});

	return {
		dashboard: query.data,
		isLoadingDashboard: query.isLoading,
		isErrorDashboard: query.isError,
		refetchDashboard: query.refetch,
	};
};
