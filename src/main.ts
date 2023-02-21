import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

import { MongoIdValidationPipe } from "./utils/mongoId-validation.pipe"

async function bootstrap() {
	const PORT = process.env.PORT

	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
		new MongoIdValidationPipe(),
	)

	await app.listen(PORT)

	console.log(`Server running on port ${PORT}`)
}

bootstrap()
