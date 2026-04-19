import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	secure: false,
	auth: {
		user: 'peggie.beier@ethereal.email',
		pass: 'gqZJhbzkWphDnCB8f1'
	},
	tls: { rejectUnauthorized: false }
})

transporter.verify().then(() => console.log('Servidor de correos listo(Ethereal)'))

export const sendEmail = async (to, subject, html) => {
	try {
		const info = await transporter.sendMail({
			from: '"Pruebas Inventario" <peggie.beier@ethereal.email>',
			to,
			subject,
			html
		})

		console.log('Correo enviado. Visualizar en %s', nodemailer.getTestMessageUrl(info))
		return {
			...info,
			previewUrl: nodemailer.getTestMessageUrl(info)
		}
	} catch (error) {
		console.error('Error al enviar el email:', error)
		throw error
	}
}