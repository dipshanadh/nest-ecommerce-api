import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { UserSchema } from "./user.schema"

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
	],
	exports: [
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
	],
})
export class UserModule {}
