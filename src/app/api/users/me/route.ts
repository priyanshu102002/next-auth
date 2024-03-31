import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

connectDB();

export async function POST(request: NextRequest) {
	try {
		// Extract Data(id) from Token
		const userId = await getDataFromToken(request);

		const user = await User.findById(userId).select("-password");

		if (!user) {
			return NextResponse.json(
				{
					error: "Invalid Token",
				},
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				message: "User Found",
				data: user,
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Something went wrong" },
			{ status: 500 }
		);
	}
}
