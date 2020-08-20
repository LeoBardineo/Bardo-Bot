const axios = require('axios')
const coronaAPI = 'https://coronavirus-19-api.herokuapp.com/all'
const coronaPaises = 'https://coronavirus-19-api.herokuapp.com/countries'

const execute = (client, message, args) => {
  if (args.length !== 0) return paisEspecifico(message, args)

  axios.get(coronaAPI).then((response) => {
    if (response.status !== 200) return message.channel.send('Não foi possível conectar a API.')

    const data = transformData(response.data)

    let replyMessage = `<:Corona:688343852259868712> Global <:Virus:688343850900783130> \n`
    replyMessage += `Casos: ${data.cases} \n`
    replyMessage += `Mortes: ${data.deaths} \n`
    replyMessage += `Recuperados: ${data.recovered} \n`
    message.channel.send(replyMessage)
  })
}

const paisEspecifico = (message, args) => {
  const coronaAPINova = `${coronaPaises}/${args[0]}`
  axios.get(coronaAPINova).then((response) => {
    if (response.status !== 200) return message.channel.send('Não foi possível conectar a API.')
    if (response.data === 'Country not found') return message.channel.send(`País não encontrado.\nLista de países: ${coronaPaises}`)

    const data = transformData(response.data)

    let replyMessage = `<:Corona:688343852259868712> ${response.data.country} <:Virus:688343850900783130> \n`
    replyMessage += `Casos: ${data.cases} \n`
    replyMessage += `Mortes: ${data.deaths} \n`
    replyMessage += `Recuperados: ${data.recovered} \n`
    message.channel.send(replyMessage)
  })
}

const transformData = (data) => {
  const cases = data.cases.toLocaleString().replace(/,/g, '.')
  const deaths = data.deaths.toLocaleString().replace(/,/g, '.')
  const recovered = data.recovered.toLocaleString().replace(/,/g, '.')
  return { cases, deaths, recovered }
}

module.exports = {
  name: "corona",
  help: "Exibe casos, mortes e recuperados do corona globalmente ou de algum país específico",
  execute,
}