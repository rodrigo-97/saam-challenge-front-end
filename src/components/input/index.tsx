import type React from "react";

type Props = {
	label: string;
	error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ label, error, name, ...rest }) => {
	return (
		<fieldset className="fieldset w-full">
			<legend className="fieldset-legend text-left">{label}</legend>
			<input
				{...rest}
				className={`input w-full ${error ? "input-error" : ""} outline-0`}
			/>
			{error && <p className="label text-error whitespace-pre-wrap">{error}</p>}
		</fieldset>
	);
};
