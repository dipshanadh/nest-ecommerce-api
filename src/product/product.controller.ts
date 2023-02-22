import { Controller, Get, Param, Post, Body } from "@nestjs/common"

import { ProductService } from "./product.service"

import { Auth } from "../auth/auth.decorator"

import { Role } from "../role/role.enum"

import { ValidateMongoId } from "../utils/mongoId-validation"

@Controller("products")
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	getProducts() {
		return this.productService.getProducts()
	}

	@Get("/:id")
	@ValidateMongoId()
	getProduct(@Param("id") id: string) {
		return this.productService.getProduct(id)
	}

	@Post()
	@Auth(Role.Admin)
	createProduct(@Body() product) {
		return this.productService.createProduct(product)
	}
}
