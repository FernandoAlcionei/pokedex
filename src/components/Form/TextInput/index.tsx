import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormFieldProps } from "@/utils/types";
import { FieldValues } from "react-hook-form";

type TextInputProps<T extends FieldValues> = FormFieldProps<T> & {
	type?: React.HTMLInputTypeAttribute;
};

const TextInput = <T extends FieldValues>({
	form,
	label,
	name,
	type = 'text',
	placeholder
}: TextInputProps<T>) => (
	<FormField
		control={form.control}
		name={name}
		render={({ field }) => (
			<FormItem className="flex flex-col">
				<FormLabel className="pr-4">
					{label}
				</FormLabel>
				<FormControl>
					<div className="flex flex-col flex-1">
						<input
							type={type}
							placeholder={placeholder}
							className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
							{...field}
							onChange={field.onChange}
						/>
						<FormMessage />
					</div>
				</FormControl>
			</FormItem>
		)}
	/>
);

export default TextInput;
