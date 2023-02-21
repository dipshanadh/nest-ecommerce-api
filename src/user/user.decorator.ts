import { createParamDecorator, ExecutionContext } from "@nestjs/common"

import { IncomingMessage } from "http"

export const User = createParamDecorator(
	async (data: unknown, ctx: ExecutionContext) => {
		const request: IncomingMessage & { user: unknown } = ctx
			.switchToHttp()
			.getRequest()

		return request.user
	},
)
