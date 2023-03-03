// nest.js modules
import { applyDecorators, UseGuards } from "@nestjs/common"

// types
import { Role } from "../role/role.enum"

// guards
import { AuthGuard } from "./auth.guard"
import { RoleGuard } from "../role/role.guard"

// decorators
import { Roles } from "../role/role.decorator"

export function Auth(...roles: Role[]) {
	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard))
}
