import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
	try {
		const response = NextResponse.json({
			message: "Logout Successfully",
		});

		// Clear cookie
		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
