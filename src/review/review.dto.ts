import {
	MaxLength,
	IsMongoId,
	Max,
	IsPositive,
	IsNotEmpty,
} from "class-validator"

import { Types } from "mongoose"

export class CreateReviewDto {
	@IsNotEmpty({ message: "Title should not be empty" })
	@MaxLength(100, {
		message: "Enter a review title not more than 100 characters",
	})
	title: string

	@IsNotEmpty({ message: "Text should not be empty" })
	@MaxLength(500, {
		message: "Enter a review text not more than 500 characters",
	})
	text: string

	@IsPositive({ message: "Enter a valid rating from 1 to 5" })
	@Max(5, { message: "Enter a valid rating from 1 to 5" })
	rating: number

	@IsMongoId({ message: "Invalid Product ID" })
	product: Types.ObjectId
}

export class UpdateReviewDto {
	@IsNotEmpty({ message: "Title should not be empty" })
	@MaxLength(100, {
		message: "Enter a review title not more than 100 characters",
	})
	title: string

	@MaxLength(500, {
		message: "Enter a review text not more than 500 characters",
	})
	text: string

	@IsPositive({ message: "Enter a valid rating from 1 to 5" })
	@Max(5, { message: "Enter a valid rating from 1 to 5" })
	rating: number
}
