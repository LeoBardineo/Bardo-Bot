const axios = require('axios')
const dolarAPI = 'https://economia.awesomeapi.com.br/all/USD-BRL'

const execute = (client, message, args) => {
  axios.get(dolarAPI).then((response) => {
    if (response.status !== 200) return message.channel.send('Não foi possível conectar a API.')

    if (args[0]) {
      if (isNaN(args[0])) return message.channel.send('Por favor, utilize apenas números.')
    }

    const multiplier = (args[0]) ? args[0] : 1
    const data = response.data
    const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(data.USD.high * multiplier)
    let replyMessage = ':moneybag: USD -> BRL :moneybag:\n'
    replyMessage += ` U$ ${multiplier} -> ${moeda} `
    message.channel.send(replyMessage)
  })
}

module.exports = {
  name: 'dolar',
  help: 'Exibe a cotação do dólar atual',
  execute
}
