// nest.js modules
import { Injectable, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model, Types } from "mongoose"

// schema
import { UserDocument } from "../user/user.schema"
import { Product, ProductDocument } from "../product/product.schema"
import { Review, ReviewDocument } from "./review.schema"

// DTOs
import { ReviewDto } from "./review.dto"

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review.name)
		private readonly Review: Model<ReviewDocument>,

		@InjectModel(Product.name)
		private readonly Product: Model<ProductDocument>,
	) {}

	async getReviews() {
		const reviews = await this.Review.find()
			.populate({ path: "user", select: "id name" })
			.populate({ path: "product", select: "id name" })

		return { reviews }
	}

	async createReview(dto: ReviewDto, user: UserDocument) {
		let review = await this.Review.findOne({
			user: new Types.ObjectId(user.id),
			product: new Types.ObjectId(dto.product),
		})

		if (review)
			throw new BadRequestException([
				"A user can not create more than one review for a product",
			])

		review = await this.Review.create({
			...dto,
			product: new Types.ObjectId(dto.product),
			user: new Types.ObjectId(user.id),
		})

		await review.populate({ path: "user", select: "id name" })
		await review.populate({ path: "product", select: "id name" })

		// update the average rating of the product everytime
		const averageRating = await this.getAverageRating(dto.product)

		await this.Product.findByIdAndUpdate(dto.product, { averageRating })

		return { review }
	}

	async getAverageRating(productId: Types.ObjectId) {
		const result = await this.Review.aggregate([
			{
				$match: { product: productId },
			},
			{
				$group: {
					_id: "$product",
					averageRating: { $avg: "$rating" },
				},
			},
		])

		if (result[0]) {
			return result[0].averageRating
		} else {
			return 0
		}
	}
}
