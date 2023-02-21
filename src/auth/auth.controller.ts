import {
	Controller,
	Post,
	Body,
	UseGuards,
	HttpCode,
	Get,
} from "@nestjs/common"

import { AuthService } from "./auth.sevice"
import { SignupDto, LoginDto } from "./auth.dto"
import { AuthGuard } from "./auth.guard"

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

	@UseGuards(AuthGuard)
	@Get("profile")
	getCurrentUser(@User() user) {
		return { user }
	}
}
