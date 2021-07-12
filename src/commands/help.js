const execute = (client, message, args) => {
  let replyMessage = '**===== Ajuda =====**\n\n'
  client.commands.forEach(command => {
    if (command.help) {
      replyMessage += `**${process.env.PREFIX}${command.name}**: ${command.help}.\n`
    }
  })
  return message.channel.send(replyMessage)
}

module.exports = {
  name: 'help',
  help: 'Exibe informações acerca de todos os comandos',
  execute
}
