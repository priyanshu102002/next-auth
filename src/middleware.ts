import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	// User exact kis path pe hai
	const path = request.nextUrl.pathname;

	// Without login wale routes
	const isPublic =
		path === "/login" || path === "/signup" || path === "/verifyemail";

	// Token from cookie
	const token = request.cookies.get("token")?.value || "";

	// agr token hai, or aap public path pe hai to redirect to home
	if (isPublic && token) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// agr token nhi hai, and aap private path pe hai to redirect to login
	if (!isPublic && !token) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		"/",
		"/login",
		"/signup",
		"/verifyemail",
		"/profile",
		"/ [...id]",
	],
};
