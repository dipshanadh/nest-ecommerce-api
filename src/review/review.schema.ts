import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"

import { User } from "../user/user.schema"
import { Product } from "../product/product.schema"

export type ReviewDocument = HydratedDocument<Review>

@Schema()
export class Review {
	@Prop({ required: true, maxlength: 100 })
	title: string

	@Prop({ required: true, maxlength: 500 })
	text: string

	@Prop({ min: 1, max: 5, default: 1 })
	rating: number

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	user: User

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	product: Product

	@Prop({ default: Date.now })
	createdAt: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })

ReviewSchema.statics.getAverageRating = async function (
	productId: Types.ObjectId,
) {
	const result = await this.aggregate([
		{
			$group: {
				_id: "$product",
				averageRating: { $avg: "$rating" },
			},
		},
		{
			$match: { _id: productId },
		},
	])

	if (result[0]) {
		return result[0].averageRating
	} else {
		return 0
	}
}

ReviewSchema.post("save", async function () {
	const Review: any = this.constructor

	const averageRating = await Review.getAverageRating(this.product)

	await this.$model(Product.name).findByIdAndUpdate(this.product, {
		averageRating,
	})
})
