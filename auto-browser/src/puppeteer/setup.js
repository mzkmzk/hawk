// setup.js
const puppeteer = require('puppeteer')

module.exports = async () => {
  const browser = await puppeteer.launch({
    args: [],
    headless: true
  })
  return browser
}
