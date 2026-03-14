const appError = require("../utils/appError")

exports.restrictTo = (...profiles) => {
  return (req, res, next) => {
    if (!profiles.includes(req.user.profile))
      return next(new appError("Insufficient permissions", 403))
    next()
  }
}