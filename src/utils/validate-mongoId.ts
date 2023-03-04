// nest.js modules
import {
	ArgumentMetadata,
	Injectable,
	PipeTransform,
	BadRequestException,
} from "@nestjs/common"

// libraries
import { isValidObjectId } from "mongoose"

@Injectable()
export class ValidateMongoId implements PipeTransform {
	transform(id: any, metadata: ArgumentMetadata) {
		if (!isValidObjectId(id)) throw new BadRequestException(["Invalid ID"])

		return id
	}
}
