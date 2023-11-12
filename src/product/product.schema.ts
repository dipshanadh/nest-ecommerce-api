import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type ProductDocument = HydratedDocument<Product>

export enum Category {
	"desktops",
	"computer accessories",
	"laptops",
	"laptop parts",
	"cctv",
	"printers and scanners",
	"networking and wifi",
	"gaming",
	"storage and memory",
}

@Schema({
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	id: false,
})
export class Product {
	@Prop({ required: true, maxlength: 100 })
	name: string

	@Prop({ required: true, maxlength: 2000 })
	description: string

	@Prop({ required: true, default: 0, min: 0 })
	price: number

	@Prop({ required: true, default: 1, min: 1 })
	currentInStock: number

	@Prop({ required: true, enum: Category })
	category: string

	@Prop({ default: 0 })
	averageRating: number

	@Prop()
	image: string

	@Prop({ default: Date.now })
	createdAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.virtual("reviews", {
	ref: "Review",
	localField: "_id",
	foreignField: "product",
})
