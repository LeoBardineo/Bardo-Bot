const Discord = require('discord.js')
const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')

dotenv.config()

const commandFiles = fs
  .readdirSync(path.join(__dirname, '/commands'))
  .filter(filename => filename.endsWith('.js'))

const greetingFiles = fs
  .readdirSync(path.join(__dirname, '/greetings'))
  .filter(filename => filename.endsWith('.js'))

const greetingsString = greetingFiles.map(el => el.slice(0, -3)) // tira o .js

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] })

client.commands = new Discord.Collection()
client.greetings = new Discord.Collection()

for (const commandFile of commandFiles) {
  const command = require(`./commands/${commandFile}`)
  client.commands.set(command.name, command)
}

for (const greetingFile of greetingFiles) {
  const greeting = require(`./greetings/${greetingFile}`)
  client.greetings.set(greeting.name, greeting)
}

client.on('ready', () => {
  console.log(`${client.user.tag} foi iniciado, com ${client.users.cache.size} usuários, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`)
  console.log('Servidores em que estou ativo: ')
  const guildsIn = client.guilds.cache.map(guild => guild.name)
  console.log(guildsIn)
  client.user.setActivity(`em ${client.guilds.cache.size} servidores.`)
})

client.on('message', message => {
  if (message.author.bot) return
  if (message.channel.type === 'dm') return
  if (greetingsString.includes(message.content.toLowerCase())) {
    const greeting = message.content.toLowerCase().trim()
    client.greetings.get(greeting).execute(message)
  }
  if (!message.content.startsWith(process.env.PREFIX)) return

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  try {
    client.commands.get(command).execute(client, message, args)
    console.log(`(${message.author.username}): ${message.content}`)
  } catch (e) {
    return message.reply('comando inválido.')
  }
})

client.on('guildCreate', guild => {
  console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`)
  client.user.setActivity(`em ${client.guilds.cache.size} servidores.`)
})

client.on('guildDelete', guild => {
  console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
  client.user.setActivity(`em ${client.guilds.cache.size} servidores.`)
})

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome')
  if (!channel) return
  channel.send(`Bem-vindo ao ${member.guild.name}, ${member}!`, { files: ['../../asset/imgs/welcome.gif'] })
})

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome')
  if (!channel) return
  channel.send(`${member} saiu do ${member.guild.name}.`, { files: ['../../asset/imgs/goodbye.gif'] })
})

client.login(process.env.TOKEN)
