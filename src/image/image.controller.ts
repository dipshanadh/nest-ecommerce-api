// nest.js modules
import {
	Post,
	HttpStatus,
	Controller,
	UseInterceptors,
	ParseFilePipeBuilder,
} from "@nestjs/common"
import { diskStorage } from "multer"

// types
import { Role } from "../role/role.enum"

// decorators
import { Auth } from "../auth/auth.decorator"
import { FileInterceptor } from "@nestjs/platform-express"
import { UploadedFile } from "@nestjs/common/"

// utils
import { generateString } from "../utils/randomString"
import { extname } from "path"

@Controller("images")
export class ImageController {
	@Post()
	@Auth(Role.Admin)
	@UseInterceptors(
		FileInterceptor("image", {
			storage: diskStorage({
				destination: "./uploads",
				filename: (req, file, cb) => {
					cb(
						null,
						`${file.fieldname}-${generateString(10)}${extname(
							file.originalname,
						)}`,
					)
				},
			}),
		}),
	)
	uploadImage(
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: "^image/(jpg|jpeg|png|bmp|webp)$",
				})
				.addMaxSizeValidator({
					maxSize: 2 * 1000 * 1000,
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				}),
		)
		image: Express.Multer.File,
	) {
		return {
			image: image.filename,
		}
	}
}
