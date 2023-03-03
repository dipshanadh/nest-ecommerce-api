import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { UserModule } from "../user/user.module"

import { ReviewController } from "./review.controller"
import { ReviewSchema } from "./review.schema"
import { ReviewService } from "./review.service"

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{
				name: "Review",
				schema: ReviewSchema,
			},
		]),
	],
	controllers: [ReviewController],
	providers: [ReviewService],
})
export class ReviewModule {}