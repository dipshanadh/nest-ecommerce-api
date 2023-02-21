import {
	Injectable,
	CanActivate,
	ExecutionContext,
	UnauthorizedException,
} from "@nestjs/common"
import * as jwt from "jsonwebtoken"

import { IncomingMessage } from "http"

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(ctx: ExecutionContext): boolean {
		const request: IncomingMessage & { user: unknown } = ctx
			.switchToHttp()
			.getRequest()

		try {
			const token = this.getToken(request)
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

			request.user = decodedToken

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
