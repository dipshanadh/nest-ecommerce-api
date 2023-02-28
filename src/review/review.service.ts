import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

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
}
