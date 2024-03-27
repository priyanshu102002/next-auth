import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
	try {
		// Cookies se Token liya
		const token = request.cookies.get("token")?.value || "";

		// Ab Token ko verify kro
		const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);

		if (!decodedToken) {
			return NextResponse.json(
				{
					error: "No token",
				},
				{ status: 401 }
			);
		}

		// Token ke under hmne _id pass kiya tha wo send kar do
		return decodedToken.id;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
