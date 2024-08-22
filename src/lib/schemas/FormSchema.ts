import { z } from "zod";

export const FormSchema = z.object({
	countryCode: z.string().optional(),
	location: z.string().min(1, "Please enter a location"),
});
