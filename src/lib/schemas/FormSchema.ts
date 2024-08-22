import { z } from "zod";

export const FormSchema = z
	.object({
		countryCode: z.string().optional(),
		location: z.string().min(1, "Please enter a location"),
	})
	.refine(
		(data) => !(!data.countryCode && /^[0-9]\d*$/.test(data.location)),
		{
			message: "Please select a country for your postal code",
			path: ["location"],
		}
	);
