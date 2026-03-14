const logger = require("../utils/logger")

exports.errorHandler = (err, req, res, next) => {
  let { status = 500, message = "ERROR INSIDE SERVITOR" } = err
  console.log("Dentro del Error Handler")
  console.log(err)
  console.log(err.name)
  console.log(err.code)

  if (err.name == "ValidationError") status = 400

  if (err.name == "MongoServerError") {
    status = 400
    // Error de clave duplicada
    if (err.code == 11000) status = 406
  }

  logger.error.error(`Error Handler(${status}):${err}`)
  res.status(status).json({ err: message })
}