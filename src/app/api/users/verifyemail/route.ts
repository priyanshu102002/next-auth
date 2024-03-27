import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token } = reqBody;

		if (!token) {
			return NextResponse.json(
				{ error: "Token is not Provided" },
				{ status: 400 }
			);
		}

		const user = await User.findOne({
			verifyToken: token,
			verifyTokenExpiry: { $gt: Date.now() },
		});

		if (!user) {
			return NextResponse.json(
				{ error: "No User Found" },
				{ status: 400 }
			);
		}

		console.log(user);

		// verification true in the database
		user.isVerified = true;
		user.verifyToken = undefined;
		user.verifyTokenExpiry = undefined;

		await user.save();

		return NextResponse.json(
			{ message: "Email Verified Successfully" },
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
