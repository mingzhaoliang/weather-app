"use client";

import { ActionState, searchCoord } from "@/actions/searchCoord";
import { FormSchema } from "@/lib/schemas/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Search } from "lucide-react";
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
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "./ui/shadcn/hover-card";
import { Input } from "./ui/shadcn/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/shadcn/select";
import { useToast } from "./ui/shadcn/use-toast";
import Spinner from "./ui/spinner";

export default function SearchForm({
	countryCode,
	location,
}: {
	countryCode?: string;
	location?: string;
}) {
	const { toast } = useToast();
	const [actionState, formAction] = useFormState<ActionState, FormData>(
		searchCoord,
		null
	);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			mode: "city",
			countryCode: countryCode ?? "",
			location: location ?? "",
		},
	});

	const submitHandler = async (formData: FormData) => {
		formData.append("mode", form.getValues("mode"));
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
				className="relative w-full flex max-xs:flex-col sm:items-center gap-2"
			>
				<FormField
					control={form.control}
					name="mode"
					render={({ field }) => (
						<FormItem>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger className="rounded-full sm:h-12 focus-visible:ring-0 focus-visible:ring-offset-0 opacity-80">
										<SelectValue />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="city">
										By city name
									</SelectItem>
									<SelectItem value="postcode">
										By postcode
									</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
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
										placeholder="Enter a city name or postal code"
										{...field}
									/>
								</FormControl>
								<FormMessage className="absolute top-12">
									{actionState?.errors?.location}
								</FormMessage>
							</FormItem>
						)}
					/>
					{form.formState.isDirty ? (
						<SubmitButton />
					) : (
						<HoverCard openDelay={100}>
							<HoverCardTrigger asChild>
								<Info className="absolute h-6 w-6 right-4 text-neutral-600" />
							</HoverCardTrigger>
							<HoverCardContent
								className="w-64 text-sm"
								side="top"
							>
								A country must be selected if entering postal
								codes
							</HoverCardContent>
						</HoverCard>
					)}
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
