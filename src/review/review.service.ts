// nest.js modules
import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model } from "mongoose"
import { IReview } from "./review.interface"

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel("Review") private readonly Review: Model<IReview>,
	) {}

	async getReviews() {
		const reviews = await this.Review.find()

		return { reviews }
	}

	async createReview(dto, user) {
		const createdReview = await this.Review.findOne({
			user: user.id,
			bootcamp: dto.bootcamp,
		})

		if (createdReview)
			throw new BadRequestException([
				"A user can create more than one review for a product",
			])

		return {}
	}
}
