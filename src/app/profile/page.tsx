"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
	const [data, setData] = useState("nothing");
	const router = useRouter();

	const getUserDetails = async () => {
		try {
			const response = await axios.post("/api/users/me");
			setData(response.data.data._id);
		} catch (error) {
			console.log("Something went wrong", error);
		}
	};

	const logout = async () => {
		try {
			const response = await axios.get("/api/users/logout");
			console.log("logout response", response.data);
			router.push("/login");
		} catch (error) {
			console.log("Something went wrong", error);
		}
	};

	return (
		<div className="bg-slate-300 h-screen w-full flex items-center justify-center flex-col">
			<h1>Profile Page</h1>
			<h2>
				{data === "nothing" ? (
					"No Data Found"
				) : (
					<Link href={`/profile/${data}`} className="text-blue-700 p-2 underline">{data}</Link>
				)}
			</h2>
			<Button onClick={logout} variant="outline">
				Logout
			</Button>
			<Button onClick={getUserDetails} className="mt-5">
				Get User Data
			</Button>
		</div>
	);
};

export default ProfilePage;
