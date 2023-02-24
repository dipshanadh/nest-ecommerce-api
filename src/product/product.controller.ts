import { Controller, Get, Param, Post, Body, Delete, Put } from "@nestjs/common"

import { ProductService } from "./product.service"
import { ProductDto } from "./product.dto"

import { Auth } from "../auth/auth.decorator"
import { Role } from "../role/role.enum"

import { MongoIdValidationPipe } from "../utils/mongoId-validation"

@Controller("products")
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	getProducts() {
		return this.productService.getProducts()
	}

	@Post()
	@Auth(Role.Admin)
	createProduct(@Body() dto: ProductDto) {
		return this.productService.createProduct(dto)
	}

	@Get("/:id")
	getProduct(@Param("id", MongoIdValidationPipe) id: string) {
		return this.productService.getProduct(id)
	}

	@Put("/:id")
	@Auth(Role.Admin)
	updateProduct(
		@Param("id", MongoIdValidationPipe) id: string,
		@Body() dto: ProductDto,
	) {
		return this.productService.updateProduct(id, dto)
	}

	@Delete("/:id")
	@Auth(Role.Admin)
	deleteProduct(@Param("id", MongoIdValidationPipe) id: string) {
		return this.productService.deleteProduct(id)
	}
}
