import { Schema } from "mongoose"

import { IProduct, Category } from "./product.interface"

export const ProductSchema = new Schema<IProduct>({
	name: {
		type: String,
		required: true,
		maxlength: 100,
	},
	description: {
		type: String,
		required: true,
		maxlength: 2000,
	},
	price: {
		type: Number,
		required: true,
		default: 0,
		min: 0,
	},
	currentInStock: {
		type: Number,
		required: true,
		default: 1,
		min: 1,
	},
	category: {
		type: String,
		required: true,
		enum: Category,
	},
	rating: {
		type: Number,
		required: true,
		default: 0,
	},
	image: {
		type: String,
	},
})
