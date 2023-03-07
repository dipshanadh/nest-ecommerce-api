// nest.js modules
import {
	Injectable,
	BadRequestException,
	NotFoundException,
	ForbiddenException,
} from "@nestjs/common"
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

		await this.Product.findByIdAndUpdate(dto.product, {
			averageRating: await this.getAverageRating(dto.product),
		})

		return { review }
	}

	async deleteReview(id: string, currentUser: UserDocument) {
		const review = await this.Review.findById(id)

		if (!review)
			throw new NotFoundException(["No review found with the entered ID"])

		if (currentUser.id !== review.user.toString())
			throw new ForbiddenException([
				"The current user can't access this resource",
			])

		await review.remove()

		await this.Product.findByIdAndUpdate(review.product, {
			averageRating: await this.getAverageRating(review.product),
		})

		return {}
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
