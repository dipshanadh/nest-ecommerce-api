# Nest Ecommerce API

> A REST API for an Ecommerce website with NestJS and MongoDB

## Installation

```bash
git clone https://github.com/dipshanadh/nest-ecommerce-api
cd nest-ecommerce-api
npm install
```

## Usage

-   Create a MongoDB account and obtain your `MONGO_URI`.
-   Create a mailtrap account and obtain you `SMTP_PASSWORD`.
-   Rename the `.example.env` to `.env` and fill the values.

```env
PORT=3000

MONGO_URI=mongodb+srv://<username>:<password>@cluster0. trsqvq3.mongodb.net/ecommerce?retryWrites=true&w=majority& appName=Cluster0

JWT_SECRET=sustari
JWT_EXPIRE=7d

SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=api
SMTP_PASSWORD=

FROM_EMAIL=
FROM_NAME=
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Features

-   [x] User authentication and authorization
-   [x] Password reset functionality
-   [x] Product reviews and rating
-   [ ] Product search feature
-   [ ] Product filter and pagination
-   [x] Admin product management with images
-   [x] Admin orders details page
-   [ ] Mark orders as delivered option

## License

Nest Ecommerce API is [GPL3 licensed](LICENSE).
