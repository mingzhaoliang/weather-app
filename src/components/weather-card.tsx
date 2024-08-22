import { CurrentWeather } from "@/lib/types/CurrentWeather.type";
import {
	CloudRain,
	Eye,
	Sunrise,
	Sunset,
	Thermometer,
	Waves,
	Wind,
} from "lucide-react";
import Image from "next/image";

export default function WeatherCard({
	currentWeather,
}: {
	currentWeather: CurrentWeather;
}) {
	const {
		main,
		weather: weathers,
		wind,
		visibility,
		rain,
		sys,
	} = currentWeather;
	const weather = weathers[0];

	return (
		<div className="h-fit max-sm:w-full max-md:w-[28rem] max-xl:w-[30rem] w-[32rem] max-h-screen rounded-3xl max-xs:p-6 max-md:p-8 p-10 bg-white/80 overflow-scroll">
			<div className="flex justify-between items-center -mt-6">
				<h1 className="font-semibold max-md:text-3xl text-4xl">
					{currentWeather.name}
				</h1>

				<div className="flex items-center -mr-4">
					<p className="max-md:text-3xl text-4xl font-medium">
						{main.temp.toFixed(0)}°C
					</p>
					<div className="relative max-md:w-20 w-24 aspect-square">
						<Image
							src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
							alt={weather.main}
							fill
							sizes="6rem"
						/>
					</div>
				</div>
			</div>
			<p className="-mt-4 text-xl">{weather.main}</p>
			<div className="grid grid-cols-2 gap-4 mt-6">
				<InfoBlock
					icon={<Thermometer className="w-4 h-4 text-neutral-600" />}
					title="feels like"
					data={main.feels_like.toFixed(0)}
					metric="°C"
				/>
				<InfoBlock
					icon={<Waves className="w-4 h-4 text-neutral-600" />}
					title="humidity"
					data={main.humidity}
					metric="%"
				/>
				<InfoBlock
					icon={<Wind className="w-4 h-4 text-neutral-600" />}
					title="wind"
					data={wind.speed.toFixed(0)}
					metric=" m/s"
				/>
				<InfoBlock
					icon={<Eye className="w-4 h-4 text-neutral-600" />}
					title="visibility"
					data={visibility && visibility / 1000}
					metric=" km"
				/>
				<InfoBlock
					icon={<CloudRain className="w-4 h-4 text-neutral-600" />}
					title="precipitation"
					data={rain?.["1h"]?.toFixed(0)}
					metric=" mm"
					description="in the last hour"
				/>
				<InfoBlock
					icon={<Sunrise className="w-4 h-4 text-neutral-600" />}
					title="sun rise"
					data={new Date(sys.sunrise * 1000).toLocaleTimeString(
						"en-AU",
						{
							hour: "numeric",
							minute: "2-digit",
						}
					)}
				/>
				<InfoBlock
					icon={<Sunset className="w-4 h-4 text-neutral-600" />}
					title="sun set"
					data={new Date(sys.sunset * 1000).toLocaleTimeString(
						"en-AU",
						{
							hour: "numeric",
							minute: "2-digit",
						}
					)}
				/>
			</div>
		</div>
	);
}

function InfoBlock({
	icon,
	title,
	data,
	metric,
	description,
}: {
	icon: React.ReactNode;
	title: string;
	data: any;
	metric?: string;
	description?: string;
}) {
	if (!data) return null;

	return (
		<div className="w-full aspect-[4/3] bg-white/50 rounded-3xl p-4 flex flex-col gap-3">
			<div className="flex gap-2">
				{icon}
				<p className="text-sm uppercase text-neutral-600">{title}</p>
			</div>
			<p className="font-medium max-md:text-2xl text-3xl">
				{data}
				{metric}
			</p>
			<p>{description}</p>
		</div>
	);
}
