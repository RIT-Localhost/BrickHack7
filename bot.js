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

function addEvent(message) {
  const fields = message.toString().split(' --');
  const eventName = fields[0].split('!addevent ')[1];
  var channel = message.channel;

  let newEvent = {};
  events.push(newEvent);
  newEvent.name = eventName;
  if (message.toString().search('--d') != -1) {
    let description = message.content.split(' --d ')[1].split(' --')[0];
    newEvent.description = description;
  } else {
    let description = "";
    newEvent.description = '';
  }
  if (message.content.search('--w') != -1) {
    console.log("Found w");
    var weekly = true;
    newEvent.weekly = "true";
  } else {
    var weekly = false;
    newEvent.weekly = "false";
  }
  if (message.content.search('--m') != -1) {
    var monthly = true;
    newEvent.monthly = "true";
  } else {
    var monthly = false;
    newEvent.monthly = "false";
  }
  if (message.content.search('--c') != -1) {
    let channelName = message.content.split(' --c ')[1].split(' --')[0];
    channelName = channelName.substring(2, channelName.length - 1);
    channel = discordClient.channels.cache.get(channelName);
    newEvent.channel = channel;
  } else {
    newEvent.channel = "";
  }
  if (message.content.search('--r') != -1) {
    var role = message.content.split(' --r ')[1].split(' --')[0];
  } else {
    role = "everyone";
  }
  newEvent.role = role;
  if (message.toString().search('--t') != -1) {
    let time = message.toString().split(' --t ')[1].split(' --')[0];
    console.log(time);
    newEvent.time = time;
    console.log("User inputted time: ", time);
    let eventTime = new Date(time);
    let currentTime = new Date();
    let offset = eventTime - currentTime;
    setTimeout(function () {
      eventReminder(channel, newEvent.name, weekly, monthly, role);
    }, offset);
  } else {
    newEvent.time = '';
  }
}

function eventReminder(channel, eventName, weekly, monthly, role) {
  channel.send(role + ' ' + eventName + ' HAPPENING NOW!');
  if (weekly == true) {
    setInterval(function() {channel.send(role + ' ' + eventName + ' HAPPENING NOW!');}, 1000 * 60 * 60 * 24 * 7);
  }
  if (monthly == true) {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth();
    let day = currentTime.getDate();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let millis = currentTime.getMilliseconds();
    if (month == 12) {
      year++;
    }
    if (month == 1 && day > 28) {
      day = 28;
    }
    if (day > 30 && (month == 3 || month == 5 || month == 8 || month == 10)) {
      day = 30;
    }
    month = (month % 12) + 1;
    let eventTime = new Date(year, month, day, hour, minute, millis);
    let offset = eventTime - currentTime;
    console.log("Event time: " + eventTime);
    console.log("Current time: " + currentTime);
    console.log("Offset: " + offset);
    setTimeout(function () {
      eventReminder(channel, eventName, false, true, role);
    }, offset);
  }
}