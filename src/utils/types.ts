import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type Nullable<T> = T | null;

export type FormFieldProps<T extends FieldValues> = {
	form: UseFormReturn<T>;
	name: Path<T>;
	label?: string;
	placeholder?: string;
	hideErrorMessage?: boolean;
	description?: string;
};
