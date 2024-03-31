"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const router = useRouter();

	const [disabledButton, setDisabledButton] = useState(false);
	const [loading, setLoading] = useState(false);

	// After clicking the signup button
	const onSignup = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			console.log("signup success", response.data);

			router.push("/profile");
			setLoading(false);
		} catch (error: any) {
			console.log("something went wrong", error);
		}
	};

	// Jab tak pura form fill na ho jaye tab tak submit button disabled hoga
	useEffect(() => {
		if (user.email.length > 0 || user.password.length > 0) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [user]);

	return (
		<div className="w-full lg:grid lg:grid-cols-2 h-screen">
			<div className="hidden bg-muted lg:block">
				<Image
					src="/auth.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
			<div className="flex items-center justify-center py-36 lg:py-12 ">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Login</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to Login to your account
						</p>
					</div>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={user.email}
								onChange={(e) =>
									setUser({ ...user, email: e.target.value })
								}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								{/* <Link
									href="/forgot-password"
									className="ml-auto inline-block text-sm underline"
								>
									Forgot your password?
								</Link> */}
							</div>
							<Input
								id="password"
								type="password"
								required
								placeholder="password"
								value={user.password}
								onChange={(e) =>
									setUser({
										...user,
										password: e.target.value,
									})
								}
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700"
							onClick={onSignup}
							disabled={disabledButton || loading}
						>
							{loading ? "Loading..." : "Sign In"}
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="underline">
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
