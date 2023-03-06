import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { ProductController } from "./product.controller"
import { Product, ProductSchema } from "./product.schema"
import { ProductService } from "./product.service"

import { UserModule } from "../user/user.module"

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{ name: Product.name, schema: ProductSchema },
		]),
	],
	controllers: [ProductController],
	providers: [ProductService],
})
export class ProductModule {}
