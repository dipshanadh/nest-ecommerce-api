export interface IUser {
	name: string
	email: string
	password: string
	role: "user" | "admin"
	createdAt: Date
	getSignedJwtToken(): string
	matchPassword(enteredPwd: string): Promise<boolean>
}
