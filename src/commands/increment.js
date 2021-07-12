let i = 0

const execute = (client, message, args) => {
  i++
  message.channel.send(`Variável incrementada ${i} vezes.`)
}

module.exports = {
  name: 'increment',
  help: 'ajuda',
  execute
}
