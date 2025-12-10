import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components";
import { t } from "@/configs";
import { showApiError } from "@/helpers";
import { signUpSchema } from "@/models";
import { useSignUp } from "@/remotes/auth";

export const Route = createFileRoute("/auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(signUpSchema),
	});

	const navigateToSignIn = () => {
		navigate({ to: "/auth/sign-in" });
	};

	const { signUp } = useSignUp({
		onSuccess: () => {
			toast.success(t("pages.signUp.notifications.accountCreated"));
		},
		onError: (err) => {
			showApiError(err);
		},
	});

	const onSubmit = handleSubmit(async (data) => {
		await signUp(data);
		navigateToSignIn();
	});

	return (
		<div>
			<h2 className="text-2xl font-bold text-center mb-6">
				{t("pages.signUp.header")}
			</h2>

			<div className="flex flex-col gap-2">
				<Input
					label={t("pages.signUp.fields.username.label")}
					placeholder={t("pages.signUp.fields.username.placeholder")}
					name="username"
					register={register}
					error={errors.username?.message}
				/>

				<Input
					label={t("pages.signUp.fields.email.label")}
					placeholder={t("pages.signUp.fields.email.placeholder")}
					type="email"
					name="email"
					register={register}
					error={errors.email?.message}
				/>

				<Input
					label={t("pages.signUp.fields.firstName.label")}
					placeholder={t("pages.signUp.fields.firstName.placeholder")}
					name="firstName"
					register={register}
					error={errors.firstName?.message}
				/>

				<Input
					label={t("pages.signUp.fields.lastName.label")}
					placeholder={t("pages.signUp.fields.lastName.placeholder")}
					name="lastName"
					register={register}
					error={errors.lastName?.message}
				/>

				<Input
					label={t("pages.signUp.fields.password.label")}
					placeholder={t("pages.signUp.fields.password.placeholder")}
					type="password"
					name="password"
					register={register}
					error={errors.password?.message}
				/>

				<Input
					label={t("pages.signUp.fields.confirmPassword.label")}
					placeholder={t("pages.signUp.fields.confirmPassword.placeholder")}
					type="password"
					name="confirmPassword"
					register={register}
					error={errors.confirmPassword?.message}
				/>

				<button
					type="button"
					className="btn btn-primary w-full mt-2"
					onClick={onSubmit}
				>
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
