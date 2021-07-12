const execute = async (client, message, args) => {
  message.channel.startTyping()
  const m = await message.channel.send('Ping?')
  message.channel.stopTyping()
  m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. A latência da API é ${Math.round(client.ping)}ms.`)
}

module.exports = {
  name: 'ping',
  help: 'Exibe a latência',
  execute
}
