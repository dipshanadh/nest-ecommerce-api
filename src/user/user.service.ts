// nest.js modules
import {
	Injectable,
	NotFoundException,
	ForbiddenException,
	ConflictException,
} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"

// types
import { Model } from "mongoose"
import { Role } from "../role/role.enum"
import { User, UserDocument } from "./user.schema"

// DTOs
import { CreateUserDto, UpdateUserDto } from "./user.dto"

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly User: Model<UserDocument>,
	) {}

	async getUsers() {
		const users = await this.User.find()

		return { users }
	}

	async createUser(dto: CreateUserDto) {
		let user = await this.User.findOne({
			email: dto.email,
		})

		if (user)
			throw new ConflictException([
				"A user already exists with the entered email",
			])

		user = await this.User.create(dto)

		const userObject = user.toObject()
		delete userObject.password

		return { user: userObject }
	}

	async getUser(id: string) {
		const user = await this.User.findById(id)

		if (!user)
			throw new NotFoundException(["No user found with the entered ID"])

		return { user }
	}

	async updateUser(
		id: string,
		dto: UpdateUserDto,
		currentUser: UserDocument,
	) {
		const user = await this.User.findById(id)

		if (!user)
			throw new NotFoundException(["No user found with the entered ID"])

		if (currentUser.id !== user.id)
			throw new ForbiddenException([
				"The current user can't access this resource",
			])

		user.name = dto.name
		user.phone = dto.phone
		user.role = currentUser.role === Role.Admin ? dto.role : user.role

		await user.save()

		return { user }
	}

	async deleteUser(id: string, currentUser: UserDocument) {
		const user = await this.User.findById(id)

		if (!user)
			throw new NotFoundException(["No user found with the entered ID"])

		if (currentUser.id !== user.id && currentUser.role !== Role.Admin)
			throw new ForbiddenException([
				"The current user can't access this resource",
			])

		await user.delete()

		return {}
	}
}
