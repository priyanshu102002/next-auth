import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please add a username"],
			unique: [true, "Username already exists"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: [true, "Email already exists"],
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
			unique: [true, "Password already exists"],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		forgotPasswordToken: String,
		forgotPasswordExpiry: Date,
		verifyToken: String,
		verifyTokenExpiry: Date,
	},
	{ timestamps: true }
);

// Next js edge server side rendering karta hai, to ushe pata nhi hota ki ye model already bna hua hai, ya nya model banana hai. Iss liye hm do naye case lete hai, first - User model already bna hai to nya mt create kro
// second - User model nhi bna to nya model bna ke do

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;