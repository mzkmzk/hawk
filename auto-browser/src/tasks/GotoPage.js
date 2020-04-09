const getUniqueId = require('../utils/getUniqueId')
const waitWithTimeout = require('../utils/waitWithTimeout')
class GotoPage {
	constructor () {
		
  }
  
  async apply (compilation) {

    compilation.hooks.start.tapPromise('GotoPage', async function(){
      const { url } = compilation.pageInfo
      const logs = []
      const responses = []
      const requests = []
      const pageerrors = []
      const errors = []
      const requestfaileds = []
      const updateRequests = []
      const page = await compilation.browser.newPage()
      const errorStatusResponses = []
      page.on('console', msg => logs.push(msg.text()))
      page.on('response', response => responses.push(response))
      page.on('request', request => requests.push(request))
      page.on('pageerror', pageerror => pageerrors.push(pageerror))
      page.on('error', error => errors.push(error))
      page.on('requestfailed', requestfailed => requestfaileds.push(requestfailed))
      
      page.on('response', response => {
        if (response.status() >= 400) {
          errorStatusResponses.push(response)
        }
      })
      page._uuid = getUniqueId()
      
      const beforeResult = await waitWithTimeout(compilation.hooks.beforeGoToPage.promise(page), `${url} beforeGoto异常`, 1000 * 10) 
      console.log('beforeResult', beforeResult)

      await waitWithTimeout(page.goto(url), 10000, `${url} 加载异常`)
      const result = { page, logs, requests, responses, pageerrors, errors, requestfaileds, updateRequests, errorStatusResponses }
      compilation.taskResult.gotoPage = result
      
      compilation.hooks.afterGotoPage.promise()
      compilation.hooks.taskComplete.promise()
    })
    
  }
}

module.exports = GotoPage