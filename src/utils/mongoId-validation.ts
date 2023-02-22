import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	BadRequestException,
	UsePipes,
	applyDecorators,
} from "@nestjs/common"
import { isValidObjectId } from "mongoose"

@Injectable()
class MongoIdValidationPipe implements PipeTransform {
	transform(id: any, metadata: ArgumentMetadata) {
		if (!isValidObjectId(id))
			throw new BadRequestException(["Invalid MongoID"])

		return id
	}
}

export function ValidateMongoId() {
	return applyDecorators(UsePipes(MongoIdValidationPipe))
}
