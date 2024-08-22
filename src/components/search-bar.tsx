"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/shadcn/input";

export default function SearchBar() {
	// Initialize states
	const [location, setLocation] = useState("");

	return (
		<form className="relative flex w-96 items-center">
			<Input
				id="search"
				name="search"
				className="flex-1 h-12 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full"
				placeholder="Search weather by location"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
			/>
			<button type="submit" className="absolute right-4">
				<Search className="h-6 w-6 text-neutral-600" />
			</button>
		</form>
	);
}
