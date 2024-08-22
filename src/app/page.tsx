import SearchForm from "@/components/search-form";

export default function Home() {
	return (
		<div className="w-screen min-h-screen px-4 bg-default bg-cover bg-center flex justify-center items-center">
			<div className="w-[32rem]">
				<SearchForm />
			</div>
		</div>
	);
}
