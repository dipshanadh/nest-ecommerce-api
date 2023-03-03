// nest.js modules
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"

// types
import { Role } from "./role.enum"

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(ctx: ExecutionContext) {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
			"roles",
			[ctx.getHandler(), ctx.getClass()],
		)

		if (requiredRoles.length === 0) return true

		const { user } = ctx.switchToHttp().getRequest()

		const canAccess = requiredRoles.some(role => user.role.includes(role))

		if (!canAccess)
			throw new ForbiddenException([
				"Users are forbidden to access this resource",
			])

		return canAccess
	}
}
