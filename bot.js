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
let fields = [];

function addEvent(message) {
  fields = message.content.split("--");
  eventName = fields[0].split("!addevent ")[1];

  let newEvent = {};
  newEvent.name = eventName;
  console.log(eventName)
  if (message.content.search("--t") != -1) {
    console.log("Found time flag")
    let time = message.content.split("--t")[1].split("--")[0];
    console.log(time);
    newEvent.time = time;
    var eventTime = new Date(time);
    var currentTime = new Date().getTime();
    console.log("Event Time: " + eventTime);
    console.log("Current Time: " + currentTime);
    var offset = eventTime - currentTime;
    console.log("Offset: " + offset);
    setTimeout(function() {eventReminder(message.channel, newEvent.name)}, offset);

  }
  else {
    newEvent.time = "";
  }
  if (message.content.search("--d") != -1) {
    let description = message.content.split("--d")[1].split("--")[0];
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