const Discord = require('discord.js')
// const config = require('./config')
const { title } = require('process')
const discordClient = new Discord.Client()

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`)
})
// discordClient.login(config.discordApiToken) 
discordClient.login(process.env.DISCORD_API_TOKEN) // make sure the key is called DISCORD_API_TOKEN