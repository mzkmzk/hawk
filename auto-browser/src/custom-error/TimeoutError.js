class TimeoutError extends Error {
  constructor (message, options = {}) {
    super(message)
    this.name = this.constructor.name
    this.detailMessage = this.getDetailMessage(options)

    Error.captureStackTrace(this, this.constructor)
  }

  getDetailMessage (options) {
    const { timeout, customMessage } = options
    return JSON.stringify({
      timeout,
      customMessage
    })
  }
}

module.exports = TimeoutError
