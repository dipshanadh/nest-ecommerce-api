import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class SignupDto {
	@IsString({
		message: "Enter a name",
	})
	name: string

	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@MinLength(6, { message: "Enter a password atleast 6 characters long" })
	password: string
}

export class LoginDto {
	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@IsNotEmpty({ message: "Enter a password" })
	password: string
}
