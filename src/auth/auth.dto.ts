import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
	IsMobilePhone,
	IsPhoneNumber,
} from "class-validator"

export class SignupDto {
	@IsString({
		message: "Enter a name",
	})
	name: string

	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@IsMobilePhone("ne-NP", {}, { message: "Enter a valid phone number" })
	phone: string

	@MinLength(6, { message: "Enter a password atleast 6 characters long" })
	password: string
}

export class LoginDto {
	@IsEmail({}, { message: "Enter a valid email" })
	email: string

	@IsNotEmpty({ message: "Enter a password" })
	password: string
}
