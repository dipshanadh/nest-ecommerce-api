import { Controller, Get } from "@nestjs/common"

import { ReviewService } from "./review.service"

@Controller({
	path: "reviews",
	version: "1",
})
export class ReviewController {
	constructor(private reviewService: ReviewService) {}

	@Get()
	getReviews() {
		return this.reviewService.getReviews()
	}
}
