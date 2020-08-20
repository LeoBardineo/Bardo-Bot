const puppeteer = require('puppeteer')
const path = require('path')

const execute = async (client, message, args) => {
  message.channel.startTyping()
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('https://pt.wikipedia.org/wiki/Especial:Aleat%C3%B3ria')
  await page.screenshot({ path: path.join(__dirname, '../../asset/img/randompage.png') })
  await page.close()
  await browser.close()
  message.channel.stopTyping()
  message.channel.send('Página aleatória da wiki:', { files: [path.join(__dirname, '../../asset/img/randompage.png')] })
}

module.exports = {
  name: "wiki",
  help: "Exibe uma página aleatória da wikipedia",
  execute,
}
