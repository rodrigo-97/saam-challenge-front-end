import type React from "react";
import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	error?: string;
	register: any; // type correto do react-hook-form: Use `UseFormRegister<any>` se quiser tipar
	name: string;
};

export const Input: React.FC<Props> = ({
	label,
	error,
	register,
	name,
	...rest
}) => {
	return (
		<fieldset className="fieldset w-full">
			<legend className="fieldset-legend">{label}</legend>
			<input
				{...register(name)}
				{...rest}
				className={`input w-full ${error ? "input-error" : "input-primary"}`}
			/>
			{error && <p className="label text-error whitespace-pre-wrap">{error}</p>}
		</fieldset>
	);
};
