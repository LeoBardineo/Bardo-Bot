const Discord = require("discord.js");
const request = require("request");
const client = new Discord.Client();
const token = "NjgyNTkzNTQ2NTExMTg4MDI1.XlfQ6g.HaUcKWNRa484CeWFpywQICld8oA";
const apiDolar = "https://economia.awesomeapi.com.br/all/USD-BRL";
const apiCorona = "https://coronavirus-19-api.herokuapp.com/all";

client.on("ready", () => {
    console.log(`${client.user.tag} foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
    client.user.setActivity(`em ${client.guilds.size} servidores.`);
});

client.on("guildCreate", guild => {
    console.log(`O bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`);
    client.user.setActivity(`em ${client.guilds.size} servidores.`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`em ${client.guilds.size} servidores.`);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Bem-vindo ao Asilo, ${member}!`, {files: ["./imgs/tenor.gif"]});
});

client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`${member} saiu do Asilo.`, {files: ["./imgs/giphy.gif"]});
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    // console.log(`${message.author.username}: ${message.content}`);
    const comando = message.content.trim().toLowerCase();
    
    if(comando.includes("bom") && comando.includes("dia")){ message.reply("Bom dia! :sun_with_face:"); }
    if(comando.includes("boa") && comando.includes("tarde")){ message.reply("Boa tarde! :city_sunset:"); }
    if(comando.includes("boa") && comando.includes("noite")){ message.reply("Boa noite! :new_moon_with_face:"); }

    if(comando === ";ping"){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. A latência da API é ${Math.round(client.ping)}ms.`);
    }

    if(comando === ";join"){
        if(message.member.voiceChannel){
            message.member.voiceChannel.join();
        }else{ message.reply("Entre em um canal de voz!"); }
    }

    if(comando === ";leave"){
        if(message.member.voiceChannel){
            message.member.voiceChannel.leave();
        }else{ message.reply("Entre em um canal de voz!"); }
    }

    if(comando === ";dolar"){
        request(`${apiDolar}`, (err, rs, body) => {
            let apiJSON = JSON.parse(body);
            let valorDolar = apiJSON.USD.high;
            valorDolar = Math.round(valorDolar * 100)/100;
            message.channel.send(`O dolár atualmente está valendo R$${valorDolar} :dollar:`);
        });
    }

    if(comando === ";corona"){
        request(`${apiCorona}`, (err, rs, body) => {
            let apiJSON = JSON.parse(body);
            let qtdCases = apiJSON.cases;
            let qtdDeaths = apiJSON.deaths;
            let qtdRecovered = apiJSON.recovered;
            message.channel.send(`<:Corona:688343852259868712> Atualmente o corona vírus tem ${qtdCases} casos, ${qtdDeaths} mortes e ${qtdRecovered} recuperados. <:Virus:688343850900783130>`);
        });
    }

    if(comando.startsWith(";falar")){
        // Pegar a mensagem sem o ;falar
        // Deletar a mensagem
        // Enviar a mensagem sem o ;falar
        let content = message.content.replace(";falar", "");
        content = content.trim();
        console.log(message.author.username+" falou "+content+" pelo bot");
        message.delete();
        message.channel.send(content);
    }
});

client.login(token);