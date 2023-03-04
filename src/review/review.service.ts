// nest.js modules
import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model } from "mongoose"
import { IReview } from "./review.interface"

// DTOs
import { ReviewDto } from "./review.dto"

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel("Review") private readonly Review: Model<IReview>,
	) {}

	async getReviews() {
		const reviews = await this.Review.find()

		return { reviews }
	}

	async createReview(dto: ReviewDto, user) {
		let review = await this.Review.findOne({
			user: user.id,
			product: dto.product,
		})

		if (review)
			throw new BadRequestException([
				"A user can not create more than one review for a product",
			])

		review = await this.Review.create({ ...dto, user: user.id })

		return { review }
	}
}
