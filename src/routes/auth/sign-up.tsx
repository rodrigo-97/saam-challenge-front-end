import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "@/components";
import { t } from "@/configs";
import { showApiError } from "@/helpers";
import { type SignUp, signUpSchema } from "@/models";
import { useSignUp } from "@/remotes/services/auth";

export const Route = createFileRoute("/auth/sign-up")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const {
		handleSubmit,
		setValue,
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

	const handleChange = (field: keyof SignUp, value: any) => {
		setValue(field, value, { shouldValidate: true });
	};

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
					error={errors.username?.message}
					onChange={(e) => handleChange("username", e.target.value)}
				/>

				<Input
					label={t("pages.signUp.fields.email.label")}
					placeholder={t("pages.signUp.fields.email.placeholder")}
					type="email"
					name="email"
					error={errors.email?.message}
					onChange={(e) => handleChange("email", e.target.value)}
				/>

				<Input
					label={t("pages.signUp.fields.firstName.label")}
					placeholder={t("pages.signUp.fields.firstName.placeholder")}
					name="firstName"
					error={errors.firstName?.message}
					onChange={(e) => handleChange("firstName", e.target.value)}
				/>

				<Input
					label={t("pages.signUp.fields.lastName.label")}
					placeholder={t("pages.signUp.fields.lastName.placeholder")}
					name="lastName"
					error={errors.lastName?.message}
					onChange={(e) => handleChange("lastName", e.target.value)}
				/>

				<Input
					label={t("pages.signUp.fields.password.label")}
					placeholder={t("pages.signUp.fields.password.placeholder")}
					type="password"
					name="password"
					error={errors.password?.message}
					onChange={(e) => handleChange("password", e.target.value)}
				/>

				<Input
					label={t("pages.signUp.fields.confirmPassword.label")}
					placeholder={t("pages.signUp.fields.confirmPassword.placeholder")}
					type="password"
					name="confirmPassword"
					error={errors.confirmPassword?.message}
					onChange={(e) => handleChange("confirmPassword", e.target.value)}
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
