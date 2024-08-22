export const geocoding = async (
	mode: "city" | "postcode",
	countryCode: string | undefined,
	location: string
): Promise<{ lat: string; lon: string }> => {
	const queryType = mode === "postcode" ? "zip?zip" : "direct?q";
	const response = await fetch(
		`http://api.openweathermap.org/geo/1.0/${queryType}=${location}${
			countryCode ? `,${countryCode}` : ""
		}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
	);

	if (!response.ok) {
		throw new Error("Location not found");
	}

	const data = await response.json();

	if (!data || (Array.isArray(data) && data.length === 0)) {
		throw new Error("Location not found");
	}

	return Array.isArray(data)
		? {
				lat: data[0].lat,
				lon: data[0].lon,
		  }
		: {
				lat: data.lat,
				lon: data.lon,
		  };
};
