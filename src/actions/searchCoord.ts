"use server";

import { FormSchema } from "@/lib/schemas/FormSchema";
import { geocoding } from "@/services/geocoding";
import { redirect } from "next/navigation";

export type ActionState = {
	message?: string;
	errors?: any;
} | null;

export const searchCoord = async (
	prevState: ActionState,
	data: FormData
): Promise<ActionState> => {
	const formData = Object.fromEntries(data);

	const validatedFields = FormSchema.safeParse(formData);

	if (!validatedFields.success) {
		return { errors: validatedFields.error.flatten().fieldErrors };
	}

	const { mode, countryCode, location } = validatedFields.data;

	let coordinate: { lat: string; lon: string };

	try {
		// Get coordinates from location
		coordinate = await geocoding(mode, countryCode, location);
	} catch (error: any) {
		console.error(error);
		return { message: "Location not found." };
	}

	return redirect(
		`/current-weather?lat=${coordinate.lat}&lon=${coordinate.lon}`
	);
};
