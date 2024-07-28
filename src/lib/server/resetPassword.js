import { MongoClient } from "mongodb";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { MONGO_STRING, JWT_KEY, EMAIL_USER, EMAIL_PASS } from "$env/static/private";

const mongo = MONGO_STRING;
let client = await MongoClient.connect(mongo);
let db = client.db("accounts");
let collection = db.collection("users");

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
});

export const requestPasswordReset = async (email) => {
	const user = await collection.findOne({ email });

	if (!user) {
		return { error: "User with this email does not exist." };
	}

	const token = jwt.sign({ id: user._id.toString() }, JWT_KEY, { expiresIn: '1h' });

	const resetLink = `http://yourdomain.com/reset-password?token=${token}`;

	const mailOptions = {
		from: EMAIL_USER,
		to: email,
		subject: 'Password Reset',
		text: `Click the link to reset your password: ${resetLink}`
	};

	try {
		await transporter.sendMail(mailOptions);
		return { message: "Password reset email sent." };
	} catch (error) {
		return { error: error.toString() };
	}
};