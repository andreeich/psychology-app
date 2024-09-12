import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const dotVariants = cva(
	"inline-block border-[1.5px] rounded-full relative before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 transition-all",
	{
		variants: {
			size: {
				sm: "size-6",
				md: "size-8",
				lg: "size-10",
			},
			state: {
				incomplete:
					"border-gray-200 bg-base-white before:size-2 before:rounded-full before:bg-gray-300",
				complete:
					"border-brand-600 bg-brand-600 before:w-3 before:h-[0.65625rem] before:bg-tick before:bg-contain before:bg-center",
				current:
					"border-brand-600 bg-brand-600 shadow-ring before:size-2 before:rounded-full before:bg-brand-50",
			},
		},
		defaultVariants: {
			size: "sm",
			state: "incomplete",
		},
	},
);

interface DotProps
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof dotVariants> {}

const Dot: React.FC<DotProps> = ({ className, size, state, ...props }) => (
	<span className={cn(dotVariants({ size, state }), className)} {...props} />
);

const progressVariants = cva("flex items-center", {
	variants: {
		size: {
			sm: "gap-3",
			md: "gap-3.5",
			lg: "gap-4",
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

export interface ProgressProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof progressVariants> {
	steps: number;
	currentStep: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
	({ className, size, steps, currentStep, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(progressVariants({ size }), className)}
				{...props}
			>
				{Array.from({ length: steps }, (_, i) => (
					<Dot
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						size={size}
						state={
							i < currentStep
								? "complete"
								: i === currentStep
									? "current"
									: "incomplete"
						}
					/>
				))}
			</div>
		);
	},
);
Progress.displayName = "Progress";

export { Progress };
