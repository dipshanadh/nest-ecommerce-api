import {
	IsEmail,
	IsEnum,
	IsMobilePhone,
	IsString,
	MinLength,
} from "class-validator"

import { Role } from "../role/role.enum"

export class CreateUserDto {
	@IsString({
		message: "Enter a name",
	})
	name: string

	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@MinLength(6, { message: "Enter a password atleast 6 characters long" })
	password: string

	@IsMobilePhone("ne-NP", {}, { message: "Enter a valid phone number" })
	phone: string

	@IsEnum(Role, { message: "Enter a valid role" })
	role: Role
}

export class UpdateUserDto {
	@IsString({
		message: "Enter a name",
	})
	name: string

	@IsMobilePhone("ne-NP", {}, { message: "Enter a valid phone number" })
	phone: string

	@IsEnum(Role, { each: true, message: "Enter a valid role" })
	role: Role
}
