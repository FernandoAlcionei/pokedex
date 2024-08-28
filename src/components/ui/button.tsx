import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"w-full py-3 px-4 text-lg tracking-wide rounded-lg text-white focus:outline-none disabled:pointer-events-none disabled:opacity-30",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:opacity-90 text-white",
				link: 'text-black w-auto text-primary hover:opacity-70'
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				type="button"
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
