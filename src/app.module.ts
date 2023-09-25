import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { MongooseModule } from "@nestjs/mongoose"
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler"

import { AuthMoudle } from "./auth/auth.module"
import { ProductModule } from "./product/product.module"
import { ReviewModule } from "./review/review.module"
import { UserModule } from "./user/user.module"

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI),
		ThrottlerModule.forRoot([{ ttl: 100 * 60, limit: 100 }]),
		UserModule,
		AuthMoudle,
		ProductModule,
		ReviewModule,
	],
	providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
