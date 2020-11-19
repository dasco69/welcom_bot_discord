const config = require('../config.json');
const channelDiscu = config.idServeTextDiscu

//Class welcome, est retourner dans ./bot.js

class Welcome {
    constructor(client) {
        this.client = client
    }
    voiceState(client, idChannel) {
        client.on('voiceStateUpdate', (oldState, newState)=> {

            //channel textuel 'Postez vos envie'
            const channel = client.channels.cache.get(idChannel) 
        
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
    }
}


module.exports = Welcome