import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Model } from "mongoose"
import { IProduct } from "./product.interface"

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

	async createProduct(product) {
		const newProduct = await this.Product.create(product)

		return { product: newProduct }
	}
}
