import { Controller, Post } from "@nestjs/common"
import { Body } from "@nestjs/common/decorators"

import { AuthService } from "./auth.sevice"
import { SignupDto, LoginDto } from "./auth.dto"

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("signup")
	signup(@Body() dto: SignupDto) {
		return this.authService.signup(dto)
	}

	@Post("login")
	login(@Body() dto: LoginDto) {
		return this.authService.login(dto)
	}
}
