import { Controller, Get, Param } from "@nestjs/common"

import { ProductService } from "./product.service"

@Controller("products")
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	getProducts() {
		return this.productService.getProducts()
	}

	@Get("/:id")
	getProduct(@Param("id") id: string) {
		return this.productService.getProduct(id)
	}
}
