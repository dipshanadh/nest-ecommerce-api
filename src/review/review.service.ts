// nest.js modules
import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model } from "mongoose"

// schema
import { UserDocument } from "../user/user.schema"
import { Review, ReviewDocument } from "./review.schema"

// DTOs
import { ReviewDto } from "./review.dto"

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private readonly Review: Model<ReviewDocument>,
	) {}

	async getReviews() {
		const reviews = await this.Review.find()
			.populate({
				path: "user",
				select: "id name",
			})
			.populate({
				path: "product",
				select: "id name",
			})

		return { reviews }
	}

	async createReview(dto: ReviewDto, user: UserDocument) {
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
