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
	user: Types.ObjectId & User

	@Prop({ type: Types.ObjectId, ref: Product.name, required: true })
	product: Types.ObjectId & Product

	@Prop({ default: Date.now })
	createdAt: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)

ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
