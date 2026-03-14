require("dotenv").config()

// npm i swagger-jsdoc swagger-ui-express
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: "PCBUILDER API",
			version: "1.0.0",
			description: "API for managing PC Builds",
			contact: {
				name: "Alfonso Martínez Kitoko"
			},
			servers: [
				{
					url: `http://localhost:${process.env.PORT}`,
					description: 'Local Server'
				}
			]
		}
	},
	apis: ['./routes/*.js']
}

const specs = swaggerJsdoc(options)

module.exports = specs