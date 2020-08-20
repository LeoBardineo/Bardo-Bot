const execute = (client, message, args) => {
  message.channel.startTyping()
  message.channel.send('Toda a documentação do bot se encontra em: https://github.com/LeoBardineo/Bardo-Bot')
  message.channel.stopTyping()
}

module.exports = {
  name: "doc",
  help: "Exibe a documentação do bot",
  execute,
}