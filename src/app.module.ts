import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

import { AuthMoudle } from "./auth/auth.module"
import { ProductModule } from "./product/product.module"
import { UserModule } from "./user/user.module"

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		UserModule,
		AuthMoudle,
		ProductModule,
	],
	controllers: [],
})
export class AppModule {}
