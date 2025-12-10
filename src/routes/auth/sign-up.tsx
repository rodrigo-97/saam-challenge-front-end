import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { t } from "@/configs";

export const Route = createFileRoute("/auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const navigateToSignIn = () => {
		navigate({ to: "/auth/sign-in" });
	};

	return (
		<div>
			<h2 className="text-2xl font-bold text-center mb-6">
				{t("pages.signUp.header")}
			</h2>

			<div className="flex flex-col gap-2">
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signUp.fields.username.label")}
					</legend>
					<input
						type="text"
						className="input input-primary w-full"
						placeholder={t("pages.signUp.fields.username.placeholder")}
					/>
				</fieldset>

				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signUp.fields.email.label")}
					</legend>
					<input
						type="email"
						className="input input-primary w-full"
						placeholder={t("pages.signUp.fields.email.placeholder")}
					/>
				</fieldset>

				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signUp.fields.firstName.label")}
					</legend>
					<input
						type="text"
						className="input input-primary w-full"
						placeholder={t("pages.signUp.fields.firstName.placeholder")}
					/>
				</fieldset>

				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signUp.fields.lastName.label")}
					</legend>
					<input
						type="text"
						className="input input-primary w-full"
						placeholder={t("pages.signUp.fields.lastName.placeholder")}
					/>
				</fieldset>

				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signUp.fields.password.label")}
					</legend>
					<input
						type="password"
						className="input input-primary w-full"
						placeholder={t("pages.signUp.fields.password.placeholder")}
					/>
				</fieldset>

				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signUp.fields.confirmPassword.label")}
					</legend>
					<input
						type="password"
						className="input input-primary w-full"
						placeholder={t("pages.signUp.fields.confirmPassword.placeholder")}
					/>
				</fieldset>

				<button type="button" className="btn btn-primary w-full mt-2">
					{t("pages.signUp.submit")}
				</button>

				<button
					type="button"
					className="btn btn-link w-full text-center"
					onClick={navigateToSignIn}
				>
					{t("pages.signUp.alreadyHaveAccount")}
				</button>
			</div>
		</div>
	);
}
