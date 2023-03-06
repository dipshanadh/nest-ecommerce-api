// nest.js modules
import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
} from "@nestjs/common/"

// types
import { Role } from "../role/role.enum"
import { UserDocument } from "./user.schema"

// decorators
import { Auth } from "../auth/auth.decorator"
import { User } from "./user.decorator"

// services
import { UserService } from "./user.service"

// DTOs
import { CreateUserDto, UpdateUserDto } from "./user.dto"

// utils
import { ValidateMongoId } from "../utils/validate-mongoId"

@Controller("users")
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	@Auth(Role.Admin)
	getUsers() {
		return this.userService.getUsers()
	}

	@Post()
	@Auth(Role.Admin)
	createUser(@Body() dto: CreateUserDto) {
		return this.userService.createUser(dto)
	}

	@Get("/:id")
	getUser(@Param("id", ValidateMongoId) id: string) {
		return this.userService.getUser(id)
	}

	@Put("/:id")
	@Auth()
	updateUser(
		@Param("id", ValidateMongoId) id: string,
		@Body() dto: UpdateUserDto,
		@User() user: UserDocument,
	) {
		return this.userService.updateUser(id, dto, user)
	}

	@Delete("/:id")
	@Auth()
	deleteUser(
		@Param("id", ValidateMongoId) id: string,
		@User() user: UserDocument,
	) {
		return this.userService.deleteUser(id, user)
	}
}
