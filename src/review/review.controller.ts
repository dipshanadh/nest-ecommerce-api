// nest.js modules
import { Controller, Get, Post, Body } from "@nestjs/common"

// decorators
import { Auth } from "../auth/auth.decorator"
import { User } from "../user/user.decorator"

// services
import { ReviewService } from "./review.service"

@Controller("reviews")
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Get()
	getReviews() {
		return this.reviewService.getReviews()
	}

	@Post("/")
	@Auth()
	createReview(@Body() dto, @User() user) {
		return this.reviewService.createReview(dto, user)
	}
}
