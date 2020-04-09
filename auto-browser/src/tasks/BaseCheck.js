const _ = require('lodash')

class BaseCheck {
	constructor (page) {
		
  }
  
  apply (compilation) {
    compilation.hooks.afterGotoPage.tapPromise('BaseCheck', function(){
      const { url } = compilation.pageInfo
      let tempUrls
      const { page, pageerrors, requestfaileds, errors, errorStatusResponses } = compilation.taskResult.gotoPage

      // 重定向的page会导致旧页面的资源加载异常, 所以忽略重定向页面的资源加载异常
      if (page.url() !== url) {
        tempUrls = []
      }

      const reuqestfailedUrls = _.map(requestfaileds, request => request.url())

      const errorStatusReponseUrls = _.map(errorStatusResponses, response => {
        return {
          pageUrl: response.frame().url(),
          url: response.url(),
          status: response.status(),
          requestHeaders: response.request().headers(),
          responseHeaders: response.headers()
        }
      })
      
      const result = {
        pageerrors,
        reuqestfailedUrls: (tempUrls || reuqestfailedUrls),
        errorStatusReponseUrls,
        errors
      }
      compilation.taskResult.beseCheck = result
      
      compilation.hooks.taskComplete.promise()
    })
    
  }
}

module.exports = BaseCheck