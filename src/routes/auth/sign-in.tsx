import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { t } from "@/configs";
import { showApiError } from "@/helpers";
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

	const { signIn } = useSignIn({
		onError: (err) => {
			showApiError(err);
		},
	});

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
				<Input
					label={t("pages.signIn.fields.username.label")}
					placeholder={t("pages.signIn.fields.username.placeholder")}
					name="username"
					register={register}
					error={errors.username?.message}
				/>

				<Input
					label={t("pages.signIn.fields.password.label")}
					placeholder={t("pages.signIn.fields.password.placeholder")}
					type="password"
					name="password"
					register={register}
					error={errors.password?.message}
				/>

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
