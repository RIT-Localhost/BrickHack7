const event = require('./database');

function makeEvent(serverID, channelID, userID, descriptionInput, datetimeObj, titleInput, weeklyInput, monthlyInput){
    const event = new Event({
        server: serverID,
        channel: channelID,
        user: userID,
        description: descriptionInput,
        datetime: datetimeObj,
        title: titleInput,
        weekly: weeklyInput,
        monthly: monthlyInput
    });
    event.save();
}

module.exports = makeEvent;