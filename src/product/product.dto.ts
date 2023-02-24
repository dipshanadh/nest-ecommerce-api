import { IsEnum, MaxLength, IsPositive } from "class-validator"

import { Category } from "./product.interface"

export class ProductDto {
	@MaxLength(100, {
		message: "Enter a product name not more than 100 characters",
	})
	name: string

	@MaxLength(2000, {
		message: "Enter a product description not more than 2000 characters",
	})
	description: string

	@IsPositive({
		message: "Enter a valid price",
	})
	price: number

	@IsPositive({
		message: "Enter a valid current number of stocks",
	})
	currentInStock: number

	@IsEnum(Category, { message: "Enter a valid category" })
	category: String
}
