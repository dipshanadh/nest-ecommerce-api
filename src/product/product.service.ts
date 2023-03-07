// nest.js modules
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model } from "mongoose"

// schema
import { Product, ProductDocument } from "./product.schema"
import { Review, ReviewDocument } from "../review/review.schema"

// DTOs
import { ProductDto } from "./product.dto"

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(Product.name)
		private readonly Product: Model<ProductDocument>,

		@InjectModel(Review.name)
		private readonly Review: Model<ReviewDocument>,
	) {}

	async getProducts() {
		const products = await this.Product.find()

		return { products }
	}

	async getProduct(id: string) {
		const product = await this.Product.findById(id).populate("reviews")

		if (!product)
			throw new NotFoundException([
				"No product found with the entered ID",
			])

		return { product }
	}

	async createProduct(dto: ProductDto) {
		const product = await this.Product.create(dto)

		return { product }
	}

	async updateProduct(id: string, dto: ProductDto) {
		const product = await this.Product.findByIdAndUpdate(id, dto, {
			runValidators: true,
			new: true,
		})

		if (!product)
			throw new NotFoundException([
				"No product found with the entered ID",
			])

		return { product }
	}

	async deleteProduct(id: string) {
		const product = await this.Product.findByIdAndDelete(id)

		if (!product)
			throw new NotFoundException([
				"No product found with the entered ID",
			])

		await this.Review.deleteMany({ product: product._id })

		return {}
	}
}
