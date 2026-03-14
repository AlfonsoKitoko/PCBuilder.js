const logger = require("../utils/logger")
const apiResponse = require("../utils/apiResponse")

exports.errorHandler = (err, req, res, next) => {
  let status = err.status || 500
  let message = err.message || "Internal Servitor Error"
  let errors = null

  console.log("Dentro del Error Handler")
  console.log(err)

  if (err.name == "ValidationError") {
    status = 400
    errors = err.errors
  }

  if (err.name == "MongoServerError") {
    status = 400
    // Error de clave duplicada
    if (err.code == 11000) {
      status = 409
      message = "Duplicate key error: " + JSON.stringify(err.keyValue)
    }
  }

  logger.error.error(`Error Handler(${status}):${message}`)
  return apiResponse.error(res, message, status, errors)
}