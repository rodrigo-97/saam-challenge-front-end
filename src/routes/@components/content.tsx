import {
	HouseIcon,
	ListIcon,
	SignOutIcon,
	UsersIcon,
	XIcon,
} from "@phosphor-icons/react";
import { Outlet, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { t } from "@/configs";
import { useFetchProfile } from "@/remotes/services/profile/fetch-profile";

export const Content: React.FC = () => {
	const navigate = useNavigate();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const closeDrawer = () => setIsDrawerOpen(false);
	const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

	const handleNavigate = (to: string) => {
		navigate({ to });
		closeDrawer();
	};

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		handleNavigate("/auth/sign-in");
	};

	const { user, isLoadingUser } = useFetchProfile();

	return (
		<div
			className={`drawer ${isDrawerOpen ? "drawer-open" : ""} lg:drawer-open`}
		>
			<input
				type="checkbox"
				className="drawer-toggle"
				checked={isDrawerOpen}
				onChange={toggleDrawer}
			/>

			<div className="drawer-content flex flex-col">
				<nav className="navbar w-full bg-base-300 px-4">
					<button
						type="button"
						aria-label={isDrawerOpen ? "Close sidebar" : "Open sidebar"}
						className="btn btn-square btn-ghost lg:hidden"
						onClick={toggleDrawer}
					>
						{isDrawerOpen ? (
							<XIcon size={24} weight="bold" />
						) : (
							<ListIcon size={24} weight="bold" />
						)}
					</button>

					<div className="ml-2 text-lg font-semibold">
						{!isLoadingUser &&
							t("components.navbar.welcome", {
								firstName: user?.firstName,
								lastName: user?.lastName,
							})}
					</div>
				</nav>

				<div className="p-4 flex-1">
					<Outlet />
				</div>
			</div>

			<div className="drawer-side">
				<div className="flex min-h-full flex-col bg-base-200 w-64 justify-between">
					<ul className="menu p-4 w-full">
						<li>
							<button
								type="button"
								className="flex items-center gap-2"
								onClick={() => handleNavigate("/")}
							>
								<HouseIcon size={20} weight="bold" />
								<span>{t("components.drawer.dashboard")}</span>
							</button>
						</li>
						<li>
							<button
								type="button"
								className="flex items-center gap-2"
								onClick={() => handleNavigate("/employees")}
							>
								<UsersIcon size={20} weight="bold" />
								<span>{t("components.drawer.employees")}</span>
							</button>
						</li>
					</ul>

					<ul className="menu p-4 w-full">
						<li>
							<button
								type="button"
								className="flex items-center gap-2"
								onClick={handleLogout}
							>
								<SignOutIcon size={20} weight="bold" />
								<span>{t("components.drawer.signOut")}</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
