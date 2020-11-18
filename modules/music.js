const Discord = require('discord.js');
const client = new Discord.Client();
const broadcast = client.voice.createBroadcast()

const config = require('../config.json');
const prefix = config.prefix

const ytdl = require('ytdl-core');


class Music {
    constructor(client , prefix , url ) {
        this.prefix = prefix
        this.url = url
    }
    manageMusic(client, prefix) {
        client.on('message' , async message => {
            const connection = await message.member.voice.channel.join();

            const content = message.content
            let order = message.content.split(' ')[0]
            let url = message.content.split(' ')[1]

            if(message.author.bot) return
            if (!message.content.startsWith(prefix)) return;
            
            if(content.startsWith(`${prefix}play`)){
                this.execute(message, url)
                return
            }else if(content.startsWith(`${prefix}skip`)){
                this.skip()
                return
            }
            if(content.startsWith(`${prefix}pause`)) {
                this.pause(connection, message)
                return
            }
            if(content.startsWith(`${prefix}replay`)) {
                this.replay(connection, message)
                return
            }
            if(content.startsWith(`${prefix}stop`)) {
                this.stop(connection, message)
                return
            }
            if(content.startsWith(`${prefix}quit`)) {
                this.quit(connection , message)
                return
            }
            if(content.startsWith(`${prefix}aide`)) {
                this.aide(message)
                return
            }
            else {
                message.channel.send('Veuillez entrez une commande')
            }
        })
    }
    async execute(message, url){
        const connection = await message.member.voice.channel.join();
        const voiceChannel = message.member.voice.channel

        if(!voiceChannel) {
            return message.channel.send('Vous devez être sur un channel vocal!')
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
            return message.channel.send("Vous devez me donnez les droit pour que je rejoigne le channel vocal!!!");
        }
        let songInfo = await ytdl.getInfo(url)
        const song = {
            title:  songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
        }
        //console.log(song)
        this.play(connection, message, song)

    }
    play(connection, message, song) {
        try {
            connection.play(ytdl(song.url))
            connection.on('start', ()=> {
                return message.channel.send(`${song.title} est à l'écoute`)
            })
        } catch (error) {
            console.error(error)
            return
        }
    }
    skip() {
        
    }
    pause(connection, message){
        try {
            connection.dispatcher.pause()
            message.channel.send('La musique à été mis en pause')
        } catch (error) {
            console.error(error)
            return
        }
    }
    replay(connection, message) {
        try {
            connection.dispatcher.resume()
            message.channel.send('La musique reprend')
            return
        } catch (error) {
            console.error(error)
            return
        }
    }
    stop(connection, message){
        try {
            connection.dispatcher.destroy()
            message.channel.send('Vous avez arrêté la musique!!!')
            return
        } catch (error) {
            console.error(error)
            return
        }
    }
    quit(connection, message) {
        try {
            connection.disconnect()
            message.channel.send('je te dis bye bye!')
        } catch (error) {
            console.error(error)
        }
    }
    //pour eviter les problemes avec d'autre bote
    aide(message) {
        const exampleEmbed = {
            color: 0x0099ff,
            title: 'Commande',
            url: 'https://discord.js.org',
            author: {
                name: 'dasco',
                //icon_url: 'https://i.imgur.com/wSTFkRM.png',
                //url: 'https://discord.js.org',
            },
            description: 'Pour les nooby',
            thumbnail: {
                url: 'https://media.giphy.com/media/Rd7pEbE7rjZz8vySuU/giphy.gif',
            },
            fields: [
                
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: '!play',
                    value: 'Pour écouter une musique, ajouter une URL Youtube.',
                    inline: true,
                },
                {
                    name: '!pause',
                    value: 'Pour mettre en pause la musique',
                    inline: true,
                },
                {
                    name: '!replay',
                    value: 'Pour remettre la musique en route',
                    inline: true,
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
                {
                    name: '!stop',
                    value: 'Arrête la diffusion de la musique',
                    inline: true,
                },
                {
                    name: '!skip',
                    value: 'Passe à la prochaine musique',
                    inline: true,
                },
                {
                    name: '!quit',
                    value: 'Le robot quitte le channel vocal',
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Some footer text here',
                icon_url: 'https://i.imgur.com/wSTFkRM.png',
            },
        };
        try {
            message.channel.send({ embed: exampleEmbed})
            /*
            message.channel.send(`
            \n
            Commande: \n
            !play : pour écouter une musique, ajouter une URL Youtube. \n
             Si tu veux ajouter d'autre musique: !play + adresse youtube \n
            !pause : pour mettre en pause la musique \n
            !replay : pour remettre la musique en route\n
            !stop : arrête la diffusion de la musique \n
            !skip : passe à la prochaine musique \n
            !quit : le robot quitte le channel vocal\n
            `)
            */
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Music