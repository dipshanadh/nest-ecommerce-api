import { Controller, Post, Body, HttpCode, Get, Req } from "@nestjs/common"

import { AuthService } from "./auth.sevice"
import { SignupDto, LoginDto } from "./auth.dto"
import { Auth } from "./auth.decorator"

import { User } from "../user/user.decorator"

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

	@Get("profile")
	@Auth()
	getCurrentUser(@User() user) {
		return { user }
	}
}
