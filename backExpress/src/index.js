import 'dotenv/config'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import methodOverride from 'method-override'
import cors from 'cors'

import swaggerUI from 'swagger-ui-express'
import { swaggerSpecs } from './config/swagger.config.js'

import { conexMongoDB } from './config/mongodb.config.js'

import { usingMorgan } from './middlewares/morgan.mw.js'
import { errorHandler } from './middlewares/errorHandler.mw.js'

import builderRoutes from './routes/index.routes.js'
import AppError from './utils/AppError.js'

// Definir __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const backPort = process.env.BACK_PORT || 3010
const frontPort = process.env.FRONT_PORT || 4201
const baseUrl = process.env.BASE_URL || '/api/v1'
const swaggerPath = process.env.SWAGGER_DOCS || '/api-docs'

//////////////////////////////////////////////////////
// ++ MIDDLEWARES ++
//////////////////////////////////////////////////////

const allowedOrigins = [
	`http://localhost:${frontPort}`,			// Angular development server
	`https://localhost:${frontPort}`,
	`http://localhost:${backPort}`,		// Express development server
	`https://localhost:${backPort}`,
]

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin))
				callback(null, true)
			else callback(new AppError('CORS Error: Origin not allowed', 403))
		},
		credentials: true,
	})
)

app.use(express.json({ limit: '5mb' }))
app.use(methodOverride('_method'))
app.use(usingMorgan())
app.use(`${baseUrl}/public`, express.static(path.join(__dirname, '../public')))

//////////////////////////////////////////////////////
// ++ VIEW ENGINE ++
//////////////////////////////////////////////////////

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//////////////////////////////////////////////////////
// ++ SWAGGER ++
//////////////////////////////////////////////////////

app.use(
	swaggerPath,
	swaggerUI.serve,
	swaggerUI.setup(swaggerSpecs)
)

//////////////////////////////////////////////////////
// ++ ROUTES ++
//////////////////////////////////////////////////////

app.get('/', (req, res) => res.redirect(baseUrl))

app.use(baseUrl, builderRoutes)

// Captura de rutas inexistentes
app.use((req, res, next) => {
	next(new AppError(`Non-existent route: ${req.originalUrl}`, 404))
})

app.use(errorHandler)

//////////////////////////////////////////////////////
// ++ START SERVITOR ++
//////////////////////////////////////////////////////

const startServer = async () => {
	try {
		await conexMongoDB()

		app.listen(backPort, () => {
			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
			console.log(`++ Servitor running at http://localhost:${backPort}${baseUrl} ++`)
			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
			console.log(`++ Swagger running @ http://localhost:${backPort}${swaggerPath} ++`)
			console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++')
		})
	} catch (err) {
		console.error('Error starting Server', err)
		process.exit(1)
	}
}

startServer()
