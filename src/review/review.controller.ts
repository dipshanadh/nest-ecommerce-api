import { Controller, Get, Post, Body } from "@nestjs/common"

import { ReviewService } from "./review.service"

import { Auth } from "../auth/auth.decorator"
import { User } from "../user/user.decorator"

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
