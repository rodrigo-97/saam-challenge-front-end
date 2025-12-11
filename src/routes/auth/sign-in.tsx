import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components";
import { t } from "@/configs";
import { showApiError } from "@/helpers";
import { type SignIn, signInSchema } from "@/models";
import type { RemoteSignIn } from "@/remotes/models";
import { useSignIn } from "@/remotes/services/auth";

export const Route = createFileRoute("/auth/sign-in")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const {
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<SignIn>({
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

	const handleChange = (field: keyof SignIn, value: any) => {
		setValue(field, value, { shouldValidate: true });
	};

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
					error={errors.username?.message}
					onChange={(e) => handleChange("username", e.target.value)}
				/>

				<Input
					label={t("pages.signIn.fields.password.label")}
					placeholder={t("pages.signIn.fields.password.placeholder")}
					type="password"
					error={errors.password?.message}
					onChange={(e) => handleChange("password", e.target.value)}
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
