class appError extends Error {
  constructor(messageParam, statusParam) {
    super()
    this.message = messageParam
    this.status = statusParam
  }
}

module.exports = appError