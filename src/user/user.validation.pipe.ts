import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	NotFoundException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

import { Model } from "mongoose"
import { IUser } from "./user.interface"

@Injectable()
export class ValidateUserPipe implements PipeTransform {
	constructor(@InjectModel("User") private readonly User: Model<IUser>) {}

	async transform(user: { id: string }, metadata: ArgumentMetadata) {
		const createdUser = await this.User.findById(user.id)

		if (!createdUser)
			throw new NotFoundException("No user exists with the entered id")

		return createdUser
	}
}
