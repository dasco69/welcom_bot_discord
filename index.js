require('dotenv').config()

const app = require('./app.js')

const fetch = require('node-fetch')

const bot = require('./bot.js')

/*
const Discord = require('discord.js');

const client = new Discord.Client();
const presence = new Discord.ClientPresence();



const token = 'NzA4NDMxNzgxMjg3OTUyNDM2.XrXQgg.dibU7ZaK519mHV3i4aUe2YQ1bmQ';

client.once('ready', () => {
    console.log('Ready!');
    console.log(client.user.username)
});

client.on('message', message => {
    
    if (message.content.startsWith('!play')) {
      // On récupère le premier channel audio du serveur
      let voiceChannel = message.guild.channels
        .filter(function (channel) { return channel.type === 'voice' })
        .second()
      // On récupère les arguments de la commande 
      // il faudrait utiliser une expression régulière pour valider le lien youtube
      let args = message.content.split(' ')
      // On rejoint le channel audio
      voiceChannel
        .join()
        .then(function (connection) {
          // On démarre un stream à partir de la vidéo youtube
          let stream = YoutubeStream(args[1])
          stream.on('error', function () {
            message.reply("Je n'ai pas réussi à lire cette vidéo :(")
            connection.disconnect()
          })
          // On envoie le stream au channel audio
          // Il faudrait ici éviter les superpositions (envoie de plusieurs vidéo en même temps)
          connection
            .playStream(stream)
            .on('end', function () {
              connection.disconnect()
            })
        })
    }
     
  })
client.on('guildMemberAdd', member => {
    newUsers.set(member.id, member.user);
});

client.on('voiceStateUpdate', (voiceStateUpdate) => {
    let newUserChannel = voiceStateUpdate
    let user = voiceStateUpdate.member.user.tag
    let nameUser = user.split('#')[0]    

})


client.login(token);
*/