function createEventJSON(title, description, color, channel, time, weeklyReminder, monthlyReminder){
    // creat json variable
    let eventJSON = {}

    // set title
    eventJSON.title = title;

    // set description
    eventJSON.description = description;

    // set color (default white)
    if(color == null){
        eventJSON.color = "#FFFFFF";
    }else{
        eventJSON.color = color;
    }

    // set channel (default channel message sent in)
    eventJSON.channel = channel;

    // set time
    eventJSON.time = time;

    // set weekly reminder (dafault false)
    if(weeklyReminder == null){
        eventJSON.weeklyReminder = false;
    }else{
        eventJSON.weeklyReminder = true;
    }

    // set monthly reminder (default false)
    if(monthlyReminder == null){
        eventJSON.monthlyReminder = false;
    }else{
        eventJSON.monthlyReminder = true;
    }

    return eventJSON;
}

function createEventEmbed(eventJSON){
  let embed = new MessageEmbed()
    // Set the title of the field
    .setTitle(eventJSON.embeddedMessage.title)
    // Set the color of the embed
    .setColor(eventJSON.embeddedMessage.color)
    // Set the main content of the embed
    .setDescription(eventJSON.embeddedMessage.description);
    // Send the embed to the same channel as the message
    return embed;
}