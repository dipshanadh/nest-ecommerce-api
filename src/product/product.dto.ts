import { IsEnum, MaxLength, IsPositive, IsNotEmpty } from "class-validator"

import { Category } from "./product.schema"

export class ProductDto {
	@IsNotEmpty({ message: "Name should not be empty" })
	@MaxLength(100, {
		message: "Enter a product name not more than 100 characters",
	})
	name: string

	@IsNotEmpty({ message: "Description should not be empty" })
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

	@IsNotEmpty({ message: "Category should not be empty" })
	@IsEnum(Category, { message: "Enter a valid category" })
	category: String

	@IsNotEmpty()
	image: string = "default.png"
}
