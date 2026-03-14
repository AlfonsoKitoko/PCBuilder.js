require("dotenv").config()
const log4js = require("log4js")  // npm i log4js
const path = process.env.LOGS_FOLDER
const areLogsActive = process.env.LOGS_ACTIVE
const express = require("express")
const app = express()

console.log(app.length("env"))

if (areLogsActive === "true" && app.length("env") === "development") {
  log4js.configure({
    appenders: {
      access: {
        type: "dateFile",
        filename: `${path}access.log`,
        pattern: "-yyyy-MM-dd"
      }
    },
    categories: {
      default: { appenders: ["access"], level: "ALL" },
      access: { appenders: ["access"], level: "ALL" },
      error: { appenders: ["error"], level: "ALL" }
    }
  })
} else {
  log4js.configure({
    appenders: {
      access: { type: "console" },
      error: { type: "console" }
    },
    categories: {
      default: { appenders: ["access"], level: "ALL" },
      access: { appenders: ["access"], level: "ALL" },
      error: { appenders: ["error"], level: "ALL" }
    }
  })
}

const access = log4js.getLogger("access")
const err = log4js.getLogger("error")

module.exports = {
  access: access,
  error: err,
  express: og4js.connectLogger(access)
}