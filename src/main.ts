import { ValidationPipe, VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

async function bootstrap() {
	const PORT = process.env.PORT

	const app = await NestFactory.create(AppModule)

	app.enableVersioning({
		type: VersioningType.URI,
	})

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	)

	await app.listen(PORT)

	console.log(`Server listening on port ${PORT}`)
}

bootstrap()
