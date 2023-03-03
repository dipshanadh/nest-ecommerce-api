import { Role } from "../role/role.enum"

export interface IUser {
	name: string
	email: string
	password: string
	phone: string
	role: Role
	createdAt: Date
	resetPasswordToken: string
	resetPasswordExpire: number
	getSignedJwtToken(): string
	matchPassword(enteredPwd: string): Promise<boolean>
	getResetPasswordToken(): string
}
