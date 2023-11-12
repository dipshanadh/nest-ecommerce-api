import { Module } from "@nestjs/common"

import { ImageController } from "./image.controller"

import { UserModule } from "src/user/user.module"

@Module({
	imports: [UserModule],
	controllers: [ImageController],
})
export class ImageModule {}
