export const getCurrentWeather = async (lat: string, lon: string) => {
	const weatherResponse = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
	);

	if (!weatherResponse.ok) {
		throw new Error("An error occurred");
	}

	const currentWeather = await weatherResponse.json();

	return currentWeather;
};
