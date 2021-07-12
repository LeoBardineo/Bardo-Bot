const execute = (client, message, args) => {
  if (args.length === 0) return message.channel.send('Nenhuma opção escrita.')
  message.channel.startTyping()
  const escolha = args[Math.floor(Math.random() * args.length)]
  message.channel.stopTyping()
  return message.channel.send(`Eu escolho... ${escolha}`)
}

module.exports = {
  name: 'escolher',
  help: 'O bot escolhe uma opção dentre várias que você passar como parâmetro para ele escolher',
  execute
}
