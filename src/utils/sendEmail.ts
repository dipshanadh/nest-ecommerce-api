import { createTransport, SendMailOptions } from "nodemailer"

interface mailOptions {
	to: string
	subject: string
	html: string
}

export const sendEmail = async (options: mailOptions) => {
	const { to, subject, html } = options

	const transporter = createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	})

	const mailOptions: SendMailOptions = {
		from: `${process.env.FROM_EMAIL} <${process.env.FROM_NAME}>`,
		to,
		subject,
		html,
	}

	await transporter.sendMail(mailOptions)
}
