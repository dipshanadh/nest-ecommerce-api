import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common"
import { IncomingMessage } from "http"
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = this.getRequest<
			IncomingMessage & { user?: string | jwt.JwtPayload }
		>(context)

		try {
			const token = this.getToken(request)
			const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

			request.user = decodedToken

			return true
		} catch (err) {
			throw new ForbiddenException("Not authorized to access this route")
		}
	}

	protected getRequest<T>(context: ExecutionContext): T {
		return context.switchToHttp().getRequest()
	}

	protected getToken(request: IncomingMessage): string {
		const authorization = request.headers.authorization

		if (!(authorization && authorization.startsWith("Bearer")))
			throw new Error("Invalid Authorization Header")

		const token = authorization.split(" ")[1]

		return token
	}
}
