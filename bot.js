require('dotenv').config()

const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const broadcast = client.voice.createBroadcast()

const config = require('./config.json');
//Le Token de l'app
const token = config.token
const prefix = config.prefix

const ytdl = require('ytdl-core');


//On check si Discord est ready
client.once('ready', () => {
    console.log('Ready!');
    console.log(client.user.username)
});

//Pour les nouveau membre
client.on('guildMemberAdd', member => {
    newUsers.set(member.id, member.user);
})

//Repere ou et qui sont connecté au channel vien l'événement state
client.on('voiceStateUpdate', (oldState, newState)=> {

    //channel textuel 'Postez vos envie'
    const channel = client.channels.cache.get('690652386972401668') 

    if(newState.channel != null) {
        try {
            console.log(`${newState.member.user.username} est connecté à ${newState.channel.name}`)
            //On envoie au channel textuel un message tts
            channel.send(`Bonjour ${newState.member.user.username} bienvenue sur ${newState.channel.name}`, {
                tts: true
            })
        } catch (error) {
            console.error(error)
        }
    } else {
        try{
            console.log(`${oldState.member.user.username} est deconnecté.`)
            //On envoie au channel textuel un message tts
            channel.send(`On dit aurevoir à ${oldState.member.user.username} `, {
                tts: true
            })
        }catch(error){
            console.error(error)
        }
    }

})
client.on('message', message => {
    //id sercer cmd = 699625189381636157

    /*
    if(message.content.startsWith (`${prefix}test`)) {
        message.channel.send('On envoie')
        
        message.member.voice.channel.join()
            .then(connection => {
                const stream = ytdl('https://www.youtube.com/watch?v=RUQl6YcMalg&ab_channel=BillieEilishVEVO', { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                
                dispatcher.on('finish', () => voiceChannel.leave());
            })
    }
    */
    
})





client.login(token)