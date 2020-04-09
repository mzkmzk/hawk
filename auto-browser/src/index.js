const { pages } = require('./config')
const puppeteerSetup = require('./puppeteer/setup')
const _ = require('lodash')
const asyncSeries = require('./utils/asyncSeries')
const Compilation = require('./tasks/Compilation')
const index = async function () {

  try {
    const browser = await puppeteerSetup()
    const pagePromises = _.map(pages, pageInfo => new Compilation(browser, pageInfo).apply())
    await asyncSeries(pagePromises)
  } catch(e) {
    console.log(e)
  } finally {
    await global.__BROWSER_GLOBAL__.close()
  }
}
;(async function(){
  await index()
})()


module.exports = index