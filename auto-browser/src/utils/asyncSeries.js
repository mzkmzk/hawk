module.exports = function (promises) {
  if (!(promises instanceof Array)) {
    throw new Error(`asyncSeries need array, not ${Object.prototype.toString.apply(promises)}`)
  }

  return promises.reduce(function(acc, promiseNow){
    return acc.then(() => {
      return promiseNow
    })

  }, Promise.resolve())
}