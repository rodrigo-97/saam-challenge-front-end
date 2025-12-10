import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { t } from "@/configs";
import { signInSchema } from "@/models";
import { useSignIn } from "@/remotes/auth";
import type { RemoteSignIn } from "@/remotes/models";

export const Route = createFileRoute("/auth/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signInSchema),
	});

	const navigateToSignUp = () => {
		navigate({ to: "/auth/sign-up" });
	};

	const { signIn } = useSignIn();

	const onSubmit = handleSubmit(async (data) => {
		const { accessToken } = (await signIn(data)) as unknown as RemoteSignIn;
		localStorage.setItem("accessToken", accessToken);
		navigate({ to: "/" });
	});

	return (
		<div>
			<h2 className="text-2xl font-bold text-center mb-6">
				{t("pages.signIn.header")}
			</h2>

			<div className="flex flex-col gap-2">
				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signIn.fields.username.label")}
					</legend>
					<input
						{...register("username")}
						type="text"
						className="input input-primary w-full"
						placeholder={t("pages.signIn.fields.username.placeholder")}
					/>
					{errors.username && (
						<p className="label text-error">{errors.username?.message}</p>
					)}
				</fieldset>

				<fieldset className="fieldset w-full">
					<legend className="fieldset-legend">
						{t("pages.signIn.fields.password.label")}
					</legend>
					<input
						{...register("password")}
						type="password"
						className="input input-primary w-full"
						placeholder={t("pages.signIn.fields.password.placeholder")}
					/>
					{errors.password && (
						<p className="label text-error">{errors.password?.message}</p>
					)}
				</fieldset>

				<button
					type="button"
					className="btn btn-primary w-full mt-4"
					onClick={onSubmit}
				>
					{t("pages.signIn.submit")}
				</button>

				<button
					type="button"
					className="btn btn-link w-full text-center"
					onClick={navigateToSignUp}
				>
					{t("pages.signIn.register")}
				</button>
			</div>
		</div>
	);
}
