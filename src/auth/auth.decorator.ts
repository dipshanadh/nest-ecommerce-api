import { applyDecorators, UseGuards } from "@nestjs/common"

import { AuthGuard } from "./auth.guard"

import { Roles } from "../role/role.decorator"
import { Role } from "../role/role.enum"
import { RoleGuard } from "../role/role.guard"

export function Auth(...roles: Role[]) {
	return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RoleGuard))
}
