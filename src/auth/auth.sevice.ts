import {
	Injectable,
	BadRequestException,
	NotFoundException,
	ConflictException,
	InternalServerErrorException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Model } from "mongoose"
import { Request } from "express"

import { IUser } from "../user/user.interface"
import { SignupDto, LoginDto, UpdatePasswordDto } from "./auth.dto"
import { sendEmail } from "../utils/sendEmail"

@Injectable()
export class AuthService {
	constructor(@InjectModel("User") private readonly User: Model<IUser>) {}

	async signup(dto: SignupDto) {
		let user = await this.User.findOne({
			email: dto.email,
		})

		if (user)
			throw new ConflictException([
				"A user already exists with the entered email",
			])

		user = await this.User.create(dto)

		const userObject = user.toObject()
		delete userObject.password

		return { user: userObject }
	}

	async login(dto: LoginDto) {
		const user = await this.User.findOne({
			email: dto.email,
		}).select("+password")

		if (!user)
			throw new NotFoundException([
				"No user exists with the entered email",
			])

		const isMatch = await user.matchPassword(dto.password)

		if (!isMatch) throw new BadRequestException(["Invalid password"])

		return { token: user.getSignedJwtToken() }
	}

	async updatePassword(dto: UpdatePasswordDto, currentUser) {
		const user = await this.User.findById(currentUser.id).select(
			"+password",
		)

		const isMatch = await user.matchPassword(dto.password)

		if (!isMatch) throw new BadRequestException(["Invalid password"])

		user.password = dto.newPassword

		await user.save()

		return { user }
	}

	async forgotPassword(req: Request, email: string) {
		const user = await this.User.findOne({ email })

		if (!user)
			throw new NotFoundException([
				"No user exists with the entered email",
			])

		const resetToken = user.getResetPasswordToken()

		await user.save({ validateBeforeSave: false })

		const resetURL = `${req.protocol}://${req.get(
			"host",
		)}/api/v1/auth/reset-password?token=${resetToken}`

		const message = `Dear ${user.name}, <br /><br />We have received your request for a password reset. Please use the following link to reset your password: <a href="${resetURL}" target="_blank">${resetURL}</a><br /><br />If you did not request a password reset, please ignore this email.<br /><br />Thank you, <br /><br />MK Store`

		try {
			await sendEmail({
				subject: "Password reset link",
				to: email,
				html: message,
			})
		} catch (err) {
			user.resetPasswordToken = undefined
			user.resetPasswordExpire = undefined

			await user.save({ validateBeforeSave: false })

			throw new InternalServerErrorException(["Email could not be sent"])
		}

		return { message: "Please check your email" }
	}
}
