"use client";

import { ActionState, searchCoord } from "@/actions/searchCoord";
import { FormSchema } from "@/lib/schemas/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectCountry from "./select-country";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "./ui/shadcn/form";
import { Input } from "./ui/shadcn/input";
import { useToast } from "./ui/shadcn/use-toast";
import Spinner from "./ui/spinner";

export default function SearchForm() {
	const { toast } = useToast();
	const [actionState, formAction] = useFormState<ActionState, FormData>(
		searchCoord,
		null
	);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			countryCode: "",
			location: "",
		},
	});

	const submitHandler = async (formData: FormData) => {
		formData.append("countryCode", form.getValues("countryCode") ?? "");
		formAction(formData);
	};

	useEffect(() => {
		if (actionState?.message) {
			toast({
				variant: "destructive",
				title: "Something went wrong.",
				description: actionState.message,
			});
		}
	}, [actionState, toast]);

	return (
		<Form {...form}>
			<form
				action={submitHandler}
				className="relative w-[32rem] flex max-xs:flex-col sm:items-center gap-2"
			>
				<SelectCountry form={form} />
				<div className="w-full flex items-center">
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input
										className="h-12 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
										placeholder="Search weather by location"
										{...field}
									/>
								</FormControl>
								<FormMessage className="absolute top-12">
									{actionState?.errors?.location}
								</FormMessage>
							</FormItem>
						)}
					/>
					<SubmitButton />
				</div>
			</form>
		</Form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<div className="absolute right-4 flex items-center">
			{pending ? (
				<Spinner />
			) : (
				<button type="submit">
					<Search className="h-6 w-6 text-neutral-600" />
				</button>
			)}
		</div>
	);
}
