const path = require('path')
const jimp = require('jimp')
const axios = require('axios')

const execute = async (client, message, args) => {
  try {
    message.channel.startTyping()

    const response = await axios.get('https://source.unsplash.com/random')
    const photoURL = response.request.res.responseUrl
    const ronaldinho = await jimp.read(path.join(__dirname, '../../asset/img/ronaldin.png'))
    const randomBackground = await jimp.read(photoURL)

    if (randomBackground.getWidth() > 1000) {
      randomBackground.resize(900, jimp.AUTO)
    } else if (randomBackground.getHeight() > 1000) {
      randomBackground.resize(jimp.AUTO, 900)
    }

    const bgWidth = randomBackground.getWidth()
    const bgHeight = randomBackground.getHeight()
    const roleRonaldinhoPath = './asset/img/roleRonaldinho.png'

    await ronaldinho.scaleToFit(bgWidth, bgHeight)

    let compositeX = 0
    let compositeY = 0

    if (bgHeight < bgWidth) {
      compositeX = bgWidth - ronaldinho.getWidth()
    } else if (bgHeight > bgWidth) {
      compositeY = bgHeight - ronaldinho.getHeight()
    }

    randomBackground.composite(ronaldinho, compositeX, compositeY, {
      mode: jimp.BLEND_SOURCE_OVER
    })

    await randomBackground.writeAsync(roleRonaldinhoPath)

    message.channel.send('<:POG:718878706977865890> Ronaldinho agora está em outro rolê aleatório, confira imagens:', { files: [roleRonaldinhoPath] })
    message.channel.stopTyping()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  name: 'ronaldinho',
  help: 'Ronaldinho vai para outro rolê aleatório',
  execute
}
