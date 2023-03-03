// nest.js modules
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model } from "mongoose"
import { IProduct } from "./product.interface"

// DTOs
import { ProductDto } from "./product.dto"

@Injectable()
export class ProductService {
	constructor(
		@InjectModel("Product") private readonly Product: Model<IProduct>,
	) {}

	async getProducts() {
		const products = await this.Product.find()

		return { products }
	}

	async getProduct(id: string) {
		const product = await this.Product.findById(id)

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

		return {}
	}
}
