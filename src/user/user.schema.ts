import { Schema } from "mongoose"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

import { IUser } from "./user.interface"

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
