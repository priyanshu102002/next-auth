import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/user.model";

// email - jisko email send karna hai
// emailtype - kis kaam ke liye email use krna hai (forgot, signup)

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 24 * 60 * 1000,
				},
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				$set: {
					forgotPasswordToken: hashedToken,
					forgotPasswordTokenExpiry: Date.now() + 24 * 60 * 1000,
				},
			});
		} else {
		}

		var transport = nodemailer.createTransport({
			host: process.env.HOST,
			port: 2525,
			auth: {
				user: process.env.MAILUSER,
				pass: process.env.MAILPASS,
			},
		});

		const mailOption = {
			from: '"Hello, p4 👻" test@gmail.com', // sender address
			to: email, // list of receivers
			subject:
				emailType === "VERIFY"
					? "Email Verification"
					: "Reset Password",
			html: `<p>Click <a href="${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}">here</a> to ${
				emailType === "VERIFY"
					? "verify your email"
					: "reset your password"
			}
            or copy and paste the link below in your browser. <br> ${
				process.env.DOMAIN
			}/verifyemail?token=${hashedToken}
            </p>`,
		};

		const mailResponse = await transport.sendMail(mailOption);
		return mailResponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
