import { Types } from "mongoose"

import { IUser } from "../user/user.interface"
import { IProduct } from "../product/product.interface"

export interface IReview {
	title: string
	text: string
	rating: number
	product: Types.ObjectId | IProduct
	user: Types.ObjectId | IUser
	createdAt: Date
}
