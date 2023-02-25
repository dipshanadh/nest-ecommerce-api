import { Controller, Post, Body, HttpCode, Get, Patch } from "@nestjs/common"

import { AuthService } from "./auth.sevice"
import { SignupDto, LoginDto, UpdatePasswordDto } from "./auth.dto"
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

	@Patch("update-password")
	@Auth()
	updatePassword(@Body() dto: UpdatePasswordDto, @User() user) {
		return this.authService.updatePassword(dto, user)
	}
}
