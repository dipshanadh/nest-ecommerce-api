import { Schema, Types } from "mongoose"

import { IReview } from "./review.interface"

export const ReviewSchema = new Schema<IReview>({
	title: {
		type: String,
		require: true,
		maxlength: 100,
	},
	text: {
		type: String,
		require: true,
		maxlength: 500,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		default: 1,
	},
	product: {
		type: Types.ObjectId,
		ref: "Product",
		required: true,
	},
	user: {
		type: Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})
