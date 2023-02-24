export enum Category {
	"desktops",
	"computer accessories",
	"laptops",
	"laptop parts",
	"cctv",
	"printers and scanners",
	"networking and wifi",
	"gaming",
	"storage and memory",
	"gift items",
}

export interface IProduct {
	name: string
	description: string
	price: number
	currentInStock: number
	category: string
	rating: number
	image: string
}
