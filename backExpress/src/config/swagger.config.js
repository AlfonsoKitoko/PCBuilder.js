import 'dotenv/config'
// npm i swagger-jsdoc swagger-ui-express
import swaggerJsdoc from 'swagger-jsdoc'
import m2s from 'mongoose-to-swagger'

const port = process.env.PORT || 3010
const baseUrl = process.env.BASE_URL || '/api/v1'

import Build from '../models/build.model.js'
import Case from '../models/case.model.js'
import Cpu from '../models/cpu.model.js'
import Gpu from '../models/gpu.model.js'
import Mobo from '../models/mobo.model.js'
import Os from '../models/os.model.js'
import Part from '../models/part.model.js'
import Psu from '../models/psu.model.js'
import Ram from '../models/ram.model.js'
import Storage from '../models/storage.model.js'
import User from '../models/user.model.js'

const buildSchema = m2s(Build)
const caseSchema = m2s(Case)
const cpuSchema = m2s(Cpu)
const gpuSchema = m2s(Gpu)
const moboSchema = m2s(Mobo)
const osSchema = m2s(Os)
const partSchema = m2s(Part)
const psuSchema = m2s(Psu)
const ramSchema = m2s(Ram)
const storageSchema = m2s(Storage)
const userSchema = m2s(User)

delete userSchema.properties.password

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'PCBUILDER API',
			version: '1.0.0',
			description: 'API for managing PC Builds',
			contact: { name: 'Alfonso Martínez Kitoko' },
		},
		servers: [
			{
				url: `http://localhost:${port}${baseUrl}`,
				description: 'Local Servitor'
			}
		],
		components: {
			schemas: {
				Build: buildSchema,
				Case: caseSchema,
				Cpu: cpuSchema,
				Gpu: gpuSchema,
				Mobo: moboSchema,
				Os: osSchema,
				Part: partSchema,
				Psu: psuSchema,
				Ram: ramSchema,
				Storage: storageSchema,
				User: userSchema
			}
		}
	},
	apis: [
		'./src/models/*.js',		// Models
		'./src/docs/**/*.yaml'	// Routes
	]
}

export const swaggerSpecs = swaggerJsdoc(options)