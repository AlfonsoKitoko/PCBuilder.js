// TODO ver si es necesario subir archivos al servidor
import multer from 'multer'  // npm i multer
import path from 'path'
import fs from 'fs'

const uploadPath = path.join(_dirname, '../uploads')

const storage = multer.diskStorage({
	destination: (req, file, cb) =>
		cb(null, uploadPath)
	,
	filename: (req, file, cb) => {
		const timestamp = Date.now()
		const random = Math.round(Math.random() * 1e9)
		const ext = path.extname(file.originalname)
		const basename = path
			.basename(file.originalname, ext)
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9\-]/g, '')

		const filename = `${timestamp}-${random}-${basename}${ext}`

		cb(null, filename)
	}
})

const upload = multer({ storage })

export default upload