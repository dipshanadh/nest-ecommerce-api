import {
	Injectable,
	BadRequestException,
	NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { IUser } from "../user/user.interface"

import { SignupDto, LoginDto } from "./auth.dto"

@Injectable({})
export class AuthService {
	constructor(@InjectModel("User") private readonly User: Model<IUser>) {}

	async signup(dto: SignupDto) {
		let user = await this.User.findOne({
			email: dto.email,
		})

		if (user)
			throw new BadRequestException(
				"A user already exists with the entered email",
			)

		user = await this.User.create(dto)

		const userObject = user.toObject()
		delete userObject.password

		return { userObject }
	}

	async login(dto: LoginDto) {
		const user = await this.User.findOne({
			email: dto.email,
		}).select("+password")

		if (!user)
			throw new NotFoundException("No user exists with the entered email")

		const isMatch = await user.matchPassword(dto.password)

		if (!isMatch) throw new BadRequestException("Invalid password")

		return { token: user.getSignedJwtToken() }
	}
}
