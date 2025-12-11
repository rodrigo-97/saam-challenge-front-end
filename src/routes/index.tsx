import { createFileRoute } from "@tanstack/react-router";
import { t } from "@/configs";
import { formatBRL } from "@/helpers";
import { useFetchDashboard } from "@/remotes/services/metrics/fetch-dashboard";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { dashboard } = useFetchDashboard();

	if (!dashboard) {
		return <div className="p-8">{t("labels.loading")}</div>;
	}

	return (
		<div className="p-8 space-y-8">
			<div className="flex flex-wrap gap-4">
				<div className="flex-1 min-w-[200px] card bg-base-200 shadow-md p-4">
					<div className="card-body">
						<h2 className="card-title">{t("pages.dashboard.averageSalary")}</h2>
						<p className="text-2xl font-bold">
							{formatBRL(dashboard.averageSalary)}
						</p>
					</div>
				</div>
				<div className="flex-1 min-w-[200px] card bg-base-200 shadow-md p-4">
					<div className="card-body">
						<h2 className="card-title">{t("pages.dashboard.minSalary")}</h2>
						<p className="text-2xl font-bold">
							{formatBRL(dashboard.minSalary)}
						</p>
					</div>
				</div>
				<div className="flex-1 min-w-[200px] card bg-base-200 shadow-md p-4">
					<div className="card-body">
						<h2 className="card-title">{t("pages.dashboard.maxSalary")}</h2>
						<p className="text-2xl font-bold">
							{formatBRL(dashboard.maxSalary)}
						</p>
					</div>
				</div>
				<div className="flex-1 min-w-[200px] card bg-base-200 shadow-md p-4">
					<div className="card-body">
						<h2 className="card-title">{t("pages.dashboard.activeCount")}</h2>
						<p className="text-2xl font-bold">{dashboard.activeCount}</p>
					</div>
				</div>
				<div className="flex-1 min-w-[200px] card bg-base-200 shadow-md p-4">
					<div className="card-body">
						<h2 className="card-title">{t("pages.dashboard.inactiveCount")}</h2>
						<p className="text-2xl font-bold">{dashboard.inactiveCount}</p>
					</div>
				</div>
			</div>
			<div className="card bg-base-200 shadow-md p-4">
				<div className="card-body">
					<h2 className="card-title">{t("pages.dashboard.employees")}</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
						<div className="bg-base-100 p-4 rounded-lg text-center shadow-inner">
							<p className="text-sm text-gray-500">
								{t("pages.dashboard.oldestEmployee")}
							</p>
							<p className="text-xl font-bold mt-1 truncate">
								{dashboard.oldestEmployee.name}
							</p>
						</div>
						<div className="bg-base-100 p-4 rounded-lg text-center shadow-inner">
							<p className="text-sm text-gray-500">
								{t("pages.dashboard.newestEmployee")}
							</p>
							<p className="text-xl font-bold mt-1 truncate">
								{dashboard.newestEmployee.name}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
