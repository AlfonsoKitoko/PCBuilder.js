import 'dotenv/config'

// npm i swagger-jsdoc swagger-ui-express
import swaggerJsdoc from 'swagger-jsdoc'

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'PCBUILDER API',
			version: '1.0.0',
			description: 'API for managing PC Builds',
			contact: {
				name: 'Alfonso Martínez Kitoko'
			},
			servers: [
				{
					url: `http://localhost:${process.env.PORT}`,
					description: 'Local Servitor'
				}
			]
		}
	},
	apis: [
		'./docs/**/*.yaml',
		'./modules/**/*.js'
	]
}

export const swaggerSpecs = swaggerJsdoc(options)