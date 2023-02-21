import { Schema } from "mongoose"

import { IProduct } from "./product.interface"

export const ProductSchema = new Schema<IProduct>({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	currentInStock: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
	},
})
