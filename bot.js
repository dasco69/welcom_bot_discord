//Module DiscordJS
const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

//Config
const config = require('./config.json');
const token = config.token
const prefix = config.prefix

//Module Welcome
const Welcome = require('./modules/welcome.js')
const ModWelcome = new Welcome
const voicState = ModWelcome.voiceState(client)

//Module Music playing
const Music = require('./modules/music.js')
const ModMusic = new Music
const manageMusic = ModMusic.manageMusic(client, prefix)

//On check si Discord est ready
client.once('ready', () => {
    console.log('Ready!');
    console.log(client.user.username)
})
/*
client.on('message',message => {
  message.content
})
*/
client.login(token)
