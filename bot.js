const Discord = require('discord.js');
// const config = require('./config')
const { title } = require('process');
const discordClient = new Discord.Client();

discordClient.on('ready', () => {
  console.log(`Logged in as ${discordClient.user.tag}!`);
});
// discordClient.login(config.discordApiToken)
discordClient.login(process.env.DISCORD_API_TOKEN); // make sure the key is called DISCORD_API_TOKEN

discordClient.on('message', message => {
  const parser = message.toString().split(' ');
  switch(parser[0]){
    case "!addevent":
      // User can add an event
      console.log('Recognized message.');
      addEvent(message);
      break;
    case "!displayevents":
      // User can display events
      break;
    case "!deleteevent":
      // User can delete events
      break;
    case "!snowman":
    case "!snowman help":
      // User can get a help message
      break;
    default:
      // do nothing
      break;
  }
});

let events = [];
let fields = [];

function addEvent(message) {
  const fields = message.toString().split(' --');
  const eventName = fields[0].split('!addevent ')[1];

  let newEvent = {};
  newEvent.name = eventName;
  console.log(eventName);
  if (message.toString().search('--d') != 1) {
    let description = fields;
    newEvent.description = description;
  } else {
    newEvent.description = '';
  }
  if (message.content.search('--w') != -1) {
      console.log("Found w");
      var weekly = true;
  } else {
      var weekly = false;
  }
  if (message.content.search('--m') != -1) {
      var monthly = true;
  } else {
      var monthly = false;
  }
  if (message.toString().search('--t') != -1) {
    console.log('Found time flag');
    let time = message.toString().split(' --t ')[1].split(' --')[0];
    console.log(time);
    newEvent.time = time;
    console.log("User inputted time: ", time);
    let eventTime = new Date(time);
    let currentTime = new Date();
    let offset = eventTime - currentTime;
    console.log("Event time: " + eventTime);
    console.log("Current time: " + currentTime);
    console.log("Offset: " + offset);
    setTimeout(function () {
      eventReminder(message.channel, newEvent.name, weekly);
    }, offset);
  } else {
    newEvent.time = '';
  }
}

function eventReminder(channel, eventName, weekly) {
  console.log('Event time.');
  channel.send('everyone ' + eventName + ' HAPPENING NOW!');
  if (weekly == true) {
    console.log("Into weekly.");
    setInterval(function() {channel.send('everyone ' + eventName + ' HAPPENING NOW!');}, 1000 * 60 * 60 * 24 * 7);
  }
}