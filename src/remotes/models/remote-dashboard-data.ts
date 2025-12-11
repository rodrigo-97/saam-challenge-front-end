import type { RemoteEmployee } from "./remote-employee";

export type RemoteDashboard = {
	averageSalary: number;
	minSalary: number;
	maxSalary: number;
	activeCount: number;
	inactiveCount: number;
	oldestEmployee: RemoteEmployee;
	newestEmployee: RemoteEmployee;
};
