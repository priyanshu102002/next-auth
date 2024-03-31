"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
	const router = useRouter();
	const [token, setToken] = useState("");
	const [verified, setverified] = useState(false);
	const [error, setError] = useState(false);

	const verifyUserEmail = async () => {
		try {
			const response = await axios.post("/api/users/verifyemail", {
				token,
			});
			setverified(true);
      setError(false)
		} catch (error: any) {
			setError(true);
			console.log("Something went wrong", error);
		}
	};

	// Url se token extract kra hai
	useEffect(() => {
		setError(false);
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");

		// const { query } = router;
		// const urlTokenUsingNext = query.token;
		console.log(urlToken);
	}, []);

	// Token me kuch change ho tabhi hm user ko button click krne de
	useEffect(() => {
		setError(false);
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-4xl text-center">Verify Email</h1>
			<h2 className="bg-blue-500 p-2 text-black rounded-md mt-2">
				{token ? `${token}` : `No token`}
			</h2>
			{verified && (
				<div>
					<h2>Verified</h2>
					<Link href="/login">Login</Link>
				</div>
			)}
			{error && (
				<div>
					<h2>Error</h2>
				</div>
			)}
		</div>
	);
};

export default VerifyEmail;
