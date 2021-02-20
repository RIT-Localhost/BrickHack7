const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants')
const Discord = require('discord.js')
// const config = require('./config')
const { title } = require('process')
const discordClient = new Discord.Client()

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`)
})
// discordClient.login(config.discordApiToken) 
discordClient.login(process.env.DISCORD_API_TOKEN) // make sure the key is called DISCORD_API_TOKEN

discordClient.on('message', message => {
  if (message.content.startsWith("!addevent ")) {
    console.log("Recognized message.")
    addEvent(message);
  }
})

let events = [];

function addEvent(message) {
  fields = message.content.split("--");
  eventName = fields[0].split("!addevent ");

  let newEvent = {};
  newEvent.name = eventName;
  console.log(eventName)
  if (message.search("--t") != -1) {
    console.log("Found time flag")
    let time = fields.split("--t")[1].split("--")[0].strip();
    console.log(time);
    newEvent.time = time;
    var eventTime = new Date(time);
    var currentTime = new Date().getTime();
    var offset = currentTime - eventTime;
    setTimeout(function() {eventReminder(message.channel, newEvent.name)}, offset);

  }
  else {
    newEvent.time = "";
  }
  if (message.content.search("--d") != 1) {
    let description = fields.split("--d")[1].split("--")[0].strip();
    newEvent.description = description;
  }
  else {
    newEvent.description = "";
  }
  
}


function eventReminder(channel, eventName) {
  console.log("Event time.");
  channel.send("@everyone" + eventName + "HAPPENING NOW!");
}