import 'dotenv/config'
import log4js from 'log4js'  // npm i log4js

const path = process.env.LOGS_FOLDER
const logsActive = process.env.LOGS_ACTIVE === 'true'
const env = process.env.NODE_ENV || 'development'

// Formato en el que se generan las líneas en el .log
const fileLayout = {
	type: 'pattern',
	pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] - %m'
}

// Formato en el que se imprmen las líneas por consola
const consoleLayout = {
	type: 'pattern',
	pattern: '%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] -%] %m'
}

if (logsActive && env === 'development') {
	log4js.configure({
		appenders: {
			// ACCESS.LOG
			access: {
				type: 'dateFile',
				filename: `${path}access.log`,
				pattern: '-yyyy-MM-dd',
				keepFileExt: true,
				layout: fileLayout
			},
			// ERROR.LOG
			error: {
				type: 'dateFile',
				filename: `${path}error.log`,
				pattern: '-yyyy-MM-dd',
				keepFileExt: true,
				layout: fileLayout
			},
			// APP.LOG
			app: {
				type: 'dateFile',
				filename: `${path}app.log`,
				pattern: '-yyyy-MM-dd',
				keepFileExt: true,
				layout: fileLayout
			},
			// CONSOLE
			console: {
				type: 'console',
				layout: consoleLayout
			}
		},
		categories: {
			default: { appenders: ['console'], level: 'info' },
			access: { appenders: ['access', 'console'], level: 'info' },
			error: { appenders: ['error', 'console'], level: 'error' },
			app: { appenders: ['app', 'console'], level: 'info' }
		}
	})
} else {
	log4js.configure({
		appenders: {
			console: { type: console }
		},
		categories: {
			default: { appenders: ['access'], level: 'info' }
		}
	})
}

// Creamos las instancias de los loggers
export const access = log4js.getLogger('access')
export const err = log4js.getLogger('error')
export const appLogger = log4js.getLogger('app')
export const expressLogger = log4js.connectLogger(access, { level: 'info' })

// Exportación por defecto para tener todo agrupado
export default {
	access,
	err,
	app: appLogger,
	express: expressLogger
}