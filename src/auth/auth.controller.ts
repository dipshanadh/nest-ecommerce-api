// nest.js modules
import {
	Controller,
	Post,
	Body,
	HttpCode,
	Get,
	Query,
	Req,
	Put,
} from "@nestjs/common"

// types
import { Request } from "express"
import { UserDocument } from "../user/user.schema"

// DTOs
import {
	SignupDto,
	LoginDto,
	UpdatePasswordDto,
	ResetPasswordDto,
} from "./auth.dto"

// decorators
import { Auth } from "./auth.decorator"
import { User } from "../user/user.decorator"

// services
import { AuthService } from "./auth.sevice"

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
	getCurrentUser(@User() user: UserDocument) {
		return { user }
	}

	@Put("update-password")
	@Auth()
	updatePassword(@Body() dto: UpdatePasswordDto, @User() user: UserDocument) {
		return this.authService.updatePassword(dto, user)
	}

	@Post("forgot-password")
	forgotPassword(@Req() req: Request, @Query("email") email: string) {
		return this.authService.forgotPassword(req, email)
	}

	@Put("reset-password")
	resetPassword(
		@Body() dto: ResetPasswordDto,
		@Query("token") token: string,
	) {
		return this.authService.resetPassword(dto, token)
	}
}
