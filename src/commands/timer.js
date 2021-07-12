let timerContando = false
let minutosString, segundosString

const execute = async (client, message, args) => {
  if (!timerContando) {
    const dataInicial = new Date()
    const m = await message.channel.send('Timer contando! 00:00')
    var timer = setInterval(() => {
      const dataNova = new Date()
      const dataDiffMS = (dataNova - dataInicial)
      const minutos = Math.floor(dataDiffMS / 60000)
      const segundos = ((dataDiffMS % 60000) / 1000).toFixed(0)
      if (minutos <= 9) { var minutosString = `0${minutos}` } else { minutosString = minutos }
      if (segundos <= 9) { var segundosString = `0${segundos}` } else { segundosString = segundos }
      if (segundos % 5 === 0) { m.edit(`Timer contando! ${minutosString}:${segundosString}`) }
    }, 1000)
    timerContando = true
  } else {
    clearInterval(timer)
    message.channel.send(`Timer parou. ${minutosString}:${segundosString}`)
    timerContando = false
  }
}

module.exports = {
  name: 'timer',
  help: 'O bot começa a contar de 5 em 5 segundos (de 1 em 1 buga por causa da latência)',
  execute
}
