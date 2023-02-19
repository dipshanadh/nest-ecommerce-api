import { Module } from "@nestjs/common"

import { UserModule } from "../user/user.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.sevice"

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthMoudle {}
