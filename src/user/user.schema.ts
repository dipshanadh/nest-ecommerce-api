import { Schema } from "mongoose"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import * as crypto from "crypto"

import { IUser } from "./user.interface"
import { Role } from "../role/role.enum"

export const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		select: false,
	},
	phone: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: [Role.Admin, Role.User],
		default: Role.User,
	},
	resetPasswordToken: {
		type: String,
		select: false,
	},
	resetPasswordExpire: {
		type: Date,
		select: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next()

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	})
}

UserSchema.methods.matchPassword = async function (enteredPwd: string) {
	return await bcrypt.compare(enteredPwd, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
	const token = crypto.randomBytes(20).toString("base64url")

	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(token)
		.digest("base64")

	// Set expiry to current time plus 10 minutes (10 * 60 * 1000 milliseconds)
	this.resetPasswordExpire = new Date().getTime() + 10 * 60 * 100

	return token
}
