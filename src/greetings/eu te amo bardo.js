const fs = require('fs')
const path = require('path')
const loveDir = '../../asset/img/love'
const loveImgs = fs.readdirSync(path.join(__dirname, loveDir))

const execute = (message) => {
  message.channel.startTyping()
  const loveImg = loveImgs[Math.floor(Math.random() * loveImgs.length)]
  message.channel.stopTyping()
  return message.reply('eu também te amo! <:peppeLove:690919318216507404>', { files: [path.join(__dirname, loveDir, loveImg)] })
}

module.exports = {
  name: "eu te amo bardo",
  execute
}