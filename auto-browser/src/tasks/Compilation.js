const GotoPage = require('./GotoPage')
const BaseCheck = require('./BaseCheck')
const End = require('./End')

const _ = require('lodash')
const { AsyncSeriesHook } = require('tapable')

const taskMap = {
  GotoPage,
  BaseCheck,
  End
}

class Compilation {
  constructor (browser, pageInfo) {
    console.log( pageInfo)
    
    this.hooks = Object.freeze({
      start: new AsyncSeriesHook([]),
      beforeGoToPage: new AsyncSeriesHook(['page']),
      afterGotoPage: new AsyncSeriesHook([]),
      end: new AsyncSeriesHook([]),
      taskComplete: new AsyncSeriesHook([])
    })

    this.browser = browser
    this.pageInfo = pageInfo
    this.taskResult = {}
  }

  async apply () {
    const { tasks } = this.pageInfo
    _.each(tasks, task => {
      const taskPlugin = new taskMap[task]()
      
      taskPlugin.apply(this)
    })

    this.hooks.start.promise()
    return new Promise((resolve) => {
      this.hooks.end.tapPromise('Compilation', async function(){
        const { page } = compilation.taskResult.gotoPage
        await page.close()
        resolve()
      })
    })
  }


}

module.exports = Compilation