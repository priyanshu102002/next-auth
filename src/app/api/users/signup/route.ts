import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connectDB();

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		// UserData lene ke liye as a json format from frontend
		const reqBody = await request.json();

		const { username, email, password } = reqBody;

		//TODO: Add Validation

		const user = await User.findOne({ email });

		if (user) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		// Hashing the password
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// Creating the user in the database
		const newUser = new User({ username, email, password: hashedPassword });

		// Saving the new user in database
		const savedUser = await newUser.save();

		// Send Verification Email
		await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

		return NextResponse.json(
			{
				message: "User registered successfully",
				success: true,
				savedUser,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
