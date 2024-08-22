"use client";

import { cn } from "@/lib/utils/shadcn";
import { iso31661 } from "iso-3166";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./ui/shadcn/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/shadcn/command";
import { FormControl, FormField, FormItem } from "./ui/shadcn/form";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/shadcn/popover";

function sortCountries(
	countries: { label: string; value: string }[],
	selectedValue?: string
) {
	return countries.sort((a, b) => {
		if (a.value === selectedValue) return -1;
		if (b.value === selectedValue) return 1;
		return a.value > b.value ? 1 : -1;
	});
}

export default function SelectCountry({ form }: { form: any }) {
	const [open, setOpen] = useState(false);
	const countries = useMemo(
		() =>
			iso31661.map((country) => ({
				label: country.name,
				value: country.alpha2,
			})),
		[]
	);

	sortCountries(countries, form.getValues("countryCode"));

	const selectHandler = (fieldValue: string, countryValue: string) => {
		form.setValue(
			"countryCode",
			fieldValue === countryValue ? "" : countryValue
		);
		setOpen(false);

		sortCountries(countries, countryValue);
	};

	return (
		<FormField
			control={form.control}
			name="countryCode"
			render={({ field }) => (
				<FormItem>
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<FormControl>
								<Button
									variant="outline"
									role="combobox"
									aria-expanded={open}
									className="max-xs:w-full w-32 h-12 rounded-full flex justify-between items-center"
								>
									<p className="text-ellipsis text-nowrap overflow-hidden">
										{field.value
											? countries.find(
													(c) =>
														c.value === field.value
											  )?.label
											: "All countries"}
									</p>
									<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>

						<PopoverContent className="max-xs:w-[calc(100vw-2rem)] w-48 h-72 p-0">
							<Command>
								<CommandInput placeholder="Search country..." />

								<CommandList>
									<CommandEmpty>
										No country found.
									</CommandEmpty>
									<CommandGroup>
										{countries.map((country) => (
											<CommandItem
												key={country.value}
												value={country.label}
												onSelect={() => {
													selectHandler(
														field.value,
														country.value
													);
												}}
												className="px-0 cursor-pointer"
											>
												<Check
													className={cn(
														"flex-shrink-0 mr-2 h-4 w-4",
														field.value ===
															country.value
															? "opacity-100"
															: "opacity-0"
													)}
												/>
												<p className="text-ellipsis text-nowrap overflow-hidden">
													{country.label}
												</p>
											</CommandItem>
										))}
									</CommandGroup>
								</CommandList>
							</Command>
						</PopoverContent>
					</Popover>
				</FormItem>
			)}
		/>
	);
}
