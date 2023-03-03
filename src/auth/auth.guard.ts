// nest.js modules
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// libraries
import { verify } from "jsonwebtoken"

// types
import { Request } from "express"
import { Model } from "mongoose"
import { IUser } from "../user/user.interface"

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(@InjectModel("User") private readonly User: Model<IUser>) {}

	async canActivate(ctx: ExecutionContext) {
		const request: Request & { user } = ctx.switchToHttp().getRequest()

		try {
			const token = this.getToken(request)

			const decodedToken: any = verify(token, process.env.JWT_SECRET)

			const user = await this.User.findById(decodedToken.id)

			if (!user)
				throw new UnauthorizedException([
					"User not found",
					"Please login again",
				])

			request.user = user

			return true
		} catch (err) {
			switch (err.name) {
				case "UnauthorizedException":
					throw err

				case "TokenExpiredError":
					throw new UnauthorizedException([
						"Login token expired",
						"Please login again",
					])

				case "JsonWebTokenError":
					throw new UnauthorizedException([
						"Ivalid login token",
						"Please login again",
					])

				default:
					throw new UnauthorizedException([
						"Not authorized to access this resource",
					])
			}
		}
	}

	protected getToken(request: Request) {
		const authorization = request.headers.authorization

		if (!(authorization && authorization.startsWith("Bearer")))
			throw new Error("Invalid Authorization Header")

		const token = authorization.split(" ")[1]

		return token
	}
}
