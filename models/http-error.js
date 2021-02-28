class HttpError extends Error {
  constructor(message, type, errorCode) {
    super(message)
    this.type = type
    this.code = errorCode
  }
}

module.exports = HttpError
