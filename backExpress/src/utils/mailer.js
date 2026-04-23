import nodemailer from 'nodemailer'
import AppError from './AppError.js'

// const testHost = process.env.TEST_HOST
// const testEmail = process.env.TEST_EMAIL
// const testPass = process.env.TEST_PASSWORD

const gmailUser = process.env.GMAIL_EMAIL
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

/* const testTransporter = nodemailer.createTransport({
	host: testHost,
	port: 587,
	secure: false,
	auth: {
		user: testEmail,
		pass: testPass
	},
	tls: { rejectUnauthorized: false }
}) */

const gmailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: gmailUser,
		pass: gmailAppPassword
	}
})

/* transporter.verify()
	.then(() => console.log('++ Test Mail Servitor Ready (Ethereal) ++'))
	.catch((err) => console.log('!! Test Mail Servitor Error (Ethereal) !!')) */

gmailTransporter.verify()
	.then(() => console.log('++ Mail Servitor Ready (Gmail) ++'))
	.catch((err) => console.log('!! Mail Servitor Error (Gmail) !!'))

/* export const sendTestEmail = async (to, subject, html) => {
	try {
		const info = await testTransporter.sendMail({
			from: `"Pruebas Inventario" <${testEmail}>`,
			to,
			subject,
			html
		})

		const previewUrl = nodemailer.getTestMessageUrl(info)
		console.log(`Test email sent. URL: ${previewUrl}`)

		return { ...info, previewUrl }
	} catch (error) {
		throw new AppError('Error sending test email.', 500)
	}
} */

export const sendEmail = async (to, subject, html, attachments = []) => {
	try {
		const info = await gmailTransporter.sendMail({
			from: `"PCBuilder Support" <${gmailUser}>`,
			to,
			subject,
			html,
			attachments
		})

		console.log(`Email sent successfully. ID: ${info.messageId}`)
		return info
	} catch (error) {
		console.error('Internal error (Nodemailer):', error)

		throw new AppError('Error sending email. Try again in a few minutes.', 500)
	}
}