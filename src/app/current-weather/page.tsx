import SearchForm from "@/components/search-form";
import WeatherCard from "@/components/weather-card";
import { CurrentWeather } from "@/lib/types/CurrentWeather.type";
import { getCurrentWeather } from "@/services/getCurrentWeather";
import { redirect } from "next/navigation";

export default async function Page({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const { lat, lon } = searchParams;

	if (!lat || !lon) {
		redirect("/");
	}

	const currentWeather = (await getCurrentWeather(
		lat,
		lon
	)) as CurrentWeather;

	console.log(currentWeather);

	return (
		<div
			className="w-screen min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
			style={{
				backgroundImage: `url(/images/${currentWeather.weather[0].main.toLowerCase()}.jpg)`,
			}}
		>
			<div className="p-4 max-xs:w-full max-md:w-[28rem] max-xl:w-[30rem] w-[32rem] space-y-4">
				<SearchForm
					key={currentWeather.name}
					countryCode={currentWeather.sys.country}
					location={currentWeather.name}
				/>
				<WeatherCard currentWeather={currentWeather} />
			</div>
		</div>
	);
}
