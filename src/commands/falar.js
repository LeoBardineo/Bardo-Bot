const execute = (client, message, args) => {
  let content = message.content.replace(';falar', '')
  content = content.trim()
  message.delete()
  message.channel.send(content)
}

module.exports = {
  name: "falar",
  help: "O bot fala algo que o usuário passar como parâmetro",
  execute,
}