require("dotenv").config()
const jwt = require("jsonwebtoken")
const appError = require("../utils/appError")

exports.protect = (req, res, next) => {
  let token = null

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1]

  if (req.cookies.token) token = req.cookies.token

  if (!token) return next(new appError("Not authenticated", 401))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    next(new appError(`Token invalid or expired. Desc: ${error}`, 401))
  }
}