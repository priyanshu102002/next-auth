import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		const user = await User.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ error: "No User Found" },
				{ status: 400 }
			);
		}

		const validPassword = await bcryptjs.compare(password, user.password);

		if (!validPassword) {
			return NextResponse.json(
				{ error: "Check your credentials" },
				{ status: 400 }
			);
		}

		// Generating JWT token
		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		};

		const token = jwt.sign(tokenData, process.env.SECRET_TOKEN || " ", {
			expiresIn: "1h",
		});

		if (!token) {
			return NextResponse.json(
				{ error: "No Token found" },
				{ status: 400 }
			);
		}

		// Sending response to client
		const response = NextResponse.json({
			message: "LoggedIn successfully",
		});

		// Setting the cookie for verification
		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
