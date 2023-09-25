// nest.js modules
import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Delete,
	Put,
	UseInterceptors,
	ParseFilePipeBuilder,
	HttpStatus,
} from "@nestjs/common"
import { diskStorage } from "multer"

// types
import { Role } from "../role/role.enum"

// decorators
import { FileInterceptor } from "@nestjs/platform-express"
import { UploadedFile } from "@nestjs/common/"
import { Auth } from "../auth/auth.decorator"

// services
import { ProductService } from "./product.service"

// DTOs
import { ProductDto } from "./product.dto"

// utils
import { ValidateMongoId } from "../utils/validate-mongoId"
import { generateString } from "../utils/randomString"
import { extname } from "path"

@Controller("products")
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get()
	getProducts() {
		return this.productService.getProducts()
	}

	@Post()
	@Auth(Role.Admin)
	@UseInterceptors(
		FileInterceptor("image", {
			storage: diskStorage({
				destination: "./uploads",
				filename: (req, file, cb) => {
					const uniqueSuffix = generateString(10)

					cb(
						null,
						file.fieldname +
							"-" +
							uniqueSuffix +
							extname(file.originalname),
					)
				},
			}),
		}),
	)
	createProduct(
		@Body() dto: ProductDto,
		@UploadedFile(
			new ParseFilePipeBuilder()
				.addFileTypeValidator({
					fileType: "^image/(jpeg|png|gif|bmp|webp)$",
				})
				.addMaxSizeValidator({
					maxSize: 2 * 1000 * 1000,
				})
				.build({
					errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
				}),
		)
		photo: Express.Multer.File,
	) {
		console.log(photo)
		return this.productService.createProduct(dto)
	}

	@Get("/:id")
	getProduct(@Param("id", ValidateMongoId) id: string) {
		return this.productService.getProduct(id)
	}

	@Put("/:id")
	@Auth(Role.Admin)
	updateProduct(
		@Param("id", ValidateMongoId) id: string,
		@Body() dto: ProductDto,
	) {
		return this.productService.updateProduct(id, dto)
	}

	@Delete("/:id")
	@Auth(Role.Admin)
	deleteProduct(@Param("id", ValidateMongoId) id: string) {
		return this.productService.deleteProduct(id)
	}
}
