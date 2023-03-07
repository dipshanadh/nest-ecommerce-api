// nest.js modules
import { Controller, Get, Post, Body, Delete, Param, Put } from "@nestjs/common"

// types
import { UserDocument } from "../user/user.schema"

// decorators
import { Auth } from "../auth/auth.decorator"
import { User } from "../user/user.decorator"

// services
import { ReviewService } from "./review.service"

// DTOs
import { CreateReviewDto, UpdateReviewDto } from "./review.dto"

// utils
import { ValidateMongoId } from "../utils/validate-mongoId"

@Controller("reviews")
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Get()
	getReviews() {
		return this.reviewService.getReviews()
	}

	@Post("/")
	@Auth()
	createReview(@Body() dto: CreateReviewDto, @User() user: UserDocument) {
		return this.reviewService.createReview(dto, user)
	}

	@Put("/:id")
	@Auth()
	updateReview(
		@Param("id", ValidateMongoId) id: string,
		@Body() dto: UpdateReviewDto,
		@User() user: UserDocument,
	) {
		return this.reviewService.updateReview(id, dto, user)
	}

	@Delete("/:id")
	@Auth()
	deleteReview(
		@Param("id", ValidateMongoId) id: string,
		@User() user: UserDocument,
	) {
		return this.reviewService.deleteReview(id, user)
	}
}
