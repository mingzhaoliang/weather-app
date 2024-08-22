import { z } from "zod";

export const FormSchema = z
	.object({
		mode: z.enum(["city", "postcode"]),
		countryCode: z.string().optional(),
		location: z.string().min(1, "Please enter a location"),
	})
	.refine((data) => !(!data.countryCode && data.mode === "postcode"), {
		message: "Please select a country for your postcode",
		path: ["location"],
	});
