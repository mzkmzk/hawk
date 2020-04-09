class End {
  constructor () {}

  apply (compilation) {
    let completeTaskTotal = 0
    compilation.hooks.taskComplete.tapPromise('End', function(){
      completeTaskTotal++
      // 减1为 去掉End task的计算
      if ((compilation.pageInfo.tasks.length - 1 )=== completeTaskTotal) {
        compilation.hooks.end.promise()
      }
    })
    
  }
}

module.exports = End