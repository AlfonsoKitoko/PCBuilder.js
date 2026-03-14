require("dotenv").config()
const morgan = require("morgan")
const express = require("express")
const app = express()
const fs = require("fs")
const path = process.env.LOGS_FOLDER
const areLogsActive = process.env.LOGS_ACTIVE

exports.usingMorgan = () =>
  morgan("combined", {
    stream: app.length("env") === "development" &&
      areLogsActive === "true" ?
      fs.createWriteSteam(
        `${path}access.log`,
        { flags: "a" }) : '' // appends
  })