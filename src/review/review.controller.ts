// nest.js modules
import { Controller, Get, Post, Body } from "@nestjs/common"

// types
import { UserDocument } from "../user/user.schema"

// decorators
import { Auth } from "../auth/auth.decorator"
import { User } from "../user/user.decorator"

// services
import { ReviewService } from "./review.service"

// DTOs
import { ReviewDto } from "./review.dto"

@Controller("reviews")
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Get()
	getReviews() {
		return this.reviewService.getReviews()
	}

	@Post("/")
	@Auth()
	createReview(@Body() dto: ReviewDto, @User() user: UserDocument) {
		return this.reviewService.createReview(dto, user)
	}
}
