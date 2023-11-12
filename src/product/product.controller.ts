// nest.js modules
import { Controller, Get, Param, Post, Body, Delete, Put } from "@nestjs/common"

// types
import { Role } from "../role/role.enum"

// decorators
import { Auth } from "../auth/auth.decorator"

// services
import { ProductService } from "./product.service"

// DTOs
import { ProductDto } from "./product.dto"

// utils
import { ValidateMongoId } from "../utils/validate-mongoId"

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
	getProduct(@Param("id", ValidateMongoId) id: string) {
		return this.productService.getProduct(id)
	}

	@Put("/:id")
	@Auth(Role.Admin)
	updateProduct(
		@Param("id", ValidateMongoId) id: string,
		@Body() dto: ProductDto,
	) {
		return this.productService.updateProduct(id, dto)
	}

	@Delete("/:id")
	@Auth(Role.Admin)
	deleteProduct(@Param("id", ValidateMongoId) id: string) {
		return this.productService.deleteProduct(id)
	}
}
