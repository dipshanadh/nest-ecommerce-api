import { Controller, Post, Body, UseGuards, HttpCode } from "@nestjs/common"

import { AuthService } from "./auth.sevice"
import { SignupDto, LoginDto } from "./auth.dto"
import { AuthGuard } from "./auth.guard"

import { User } from "../user/user.decorator"
import { ValidateUserPipe } from "../user/user.validation.pipe"

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signup")
	signup(@Body() dto: SignupDto) {
		return this.authService.signup(dto)
	}

	@Post("login")
	@HttpCode(200)
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}

	@UseGuards(AuthGuard)
	@Post("profile")
	getCurrentUser(@User(ValidateUserPipe) user: unknown) {
		return user
	}
}
