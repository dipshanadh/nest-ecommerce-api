import { Module, forwardRef } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ProductController } from "./product.controller"
import { Product, ProductSchema } from "./product.schema"
import { ProductService } from "./product.service"

import { UserModule } from "../user/user.module"
import { ReviewModule } from "../review/review.module"

@Module({
	imports: [
		forwardRef(() => UserModule),
		forwardRef(() => ReviewModule),
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
		]),
	],
	exports: [
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
		]),
	],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
