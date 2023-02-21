import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import { InjectModel } from "@nestjs/mongoose"

import { IncomingMessage } from "http"
import { Model } from "mongoose"
import { IUser } from "../user/user.interface"
import { error } from "console"

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(@InjectModel("User") private readonly User: Model<IUser>) {}

	async canActivate(ctx: ExecutionContext) {
		const request: IncomingMessage & { user: unknown } = ctx
			.switchToHttp()
			.getRequest()

		try {
			const token = this.getToken(request)

			interface IDecodedToken {
				id: string
			}

			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET,
			) as IDecodedToken

			const user = await this.User.findById(decodedToken.id)

			if (!user) throw new error("No user exists with the entered ID")

			request.user = user

			return true
		} catch (err) {
			throw new UnauthorizedException(
				"Not authorized to access this route",
			)
		}
	}

	protected getToken(request: IncomingMessage) {
		const authorization = request.headers.authorization

		if (!(authorization && authorization.startsWith("Bearer")))
			throw new Error("Invalid Authorization Header")

		const token = authorization.split(" ")[1]

		return token
	}
}
