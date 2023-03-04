import { MaxLength, IsPositive, IsMongoId } from "class-validator"

import { Types } from "mongoose"

export class ReviewDto {
	@MaxLength(100, {
		message: "Enter a review title not more than 100 characters",
	})
	title: string

	@MaxLength(500, {
		message: "Enter a review text not more than 500 characters",
	})
	text: string

	@IsPositive({
		message: "Enter a valid rating from 1 to 5",
	})
	rating: number

	@IsMongoId({ message: "Invalid Product ID" })
	product: Types.ObjectId
}
