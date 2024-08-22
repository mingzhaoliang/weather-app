import SearchForm from "@/components/search-form";
import WeatherCard from "@/components/weather-card";
import { CurrentWeather } from "@/lib/types/CurrentWeather.type";
import { getCurrentWeather } from "@/services/getCurrentWeather";
import { House } from "lucide-react";
import Link from "next/link";
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

	return (
		<div
			className="w-screen min-h-screen p-12 bg-cover bg-center flex flex-col items-end gap-8"
			style={{
				backgroundImage: `url(/images/${currentWeather.weather[0].main.toLowerCase()}.jpg)`,
			}}
		>
			<div className="w-full flex justify-between items-center gap-4">
				<Link href="/" className="rounded-full bg-white/80 p-2">
					<House className="h-8 w-8" />
				</Link>
				<SearchForm
					key={currentWeather.name}
					countryCode={currentWeather.sys.country}
					location={currentWeather.name}
				/>
			</div>
			<WeatherCard currentWeather={currentWeather} />
		</div>
	);
}
