require("dotenv").config()
const log4js = require("log4js")  // npm i log4js

const path = process.env.LOGS_FOLDER
const logsActive = process.env.LOGS_ACTIVE === true || false
const env = process.env.NODE_ENV || "development"

app.get("env")

if (logsActive && env === "development") {
  log4js.configure({
    appenders: {
      access: {
        type: "dateFile",
        filename: `${path}access.log`,
        pattern: "-yyyy-MM-dd"
      }
    },
    categories: {
      default: { appenders: ["access"], level: "info" },
      access: { appenders: ["access"], level: "info" },
      error: { appenders: ["error"], level: "error" }
    }
  })
} else {
  log4js.configure({
    appenders: {
      access: { type: "console" },
      error: { type: "console" }
    },
    categories: {
      default: { appenders: ["access"], level: "info" },
      access: { appenders: ["access"], level: "info" },
      error: { appenders: ["error"], level: "error" }
    }
  })
}

const access = log4js.getLogger("access")
const err = log4js.getLogger("error")

module.exports = {
  access,
  err,
  express: log4js.connectLogger(access)
}