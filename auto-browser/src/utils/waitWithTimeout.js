const TimeoutError = require('../custom-error/TimeoutError')

module.exports = async function (promise, timeout = 10 * 1000, message = `请求超时, 请稍后重试`) {
  let finalReject
  /* eslint-disable no-return-assign */
  const timeoutPromise = new Promise((resolve, reject) => finalReject = reject)
  /* eslint-enable */
  let timeoutTimer = null

  if (timeout) { timeoutTimer = setTimeout(() => finalReject(new TimeoutError(message)), timeout) }
  try {
    return await Promise.race([promise, timeoutPromise])
  } finally {
    if (timeoutTimer) { clearTimeout(timeoutTimer) }
  }
}
