const Event = require('./database');

function makeEvent(serverID, channelID, userID, descriptionInput, datetimeObj, titleInput, weeklyInput, monthlyInput){
    const tempEvent = new Event({
        server: serverID,
        channel: channelID,
        user: userID,
        description: descriptionInput,
        datetime: datetimeObj,
        title: titleInput,
        weekly: weeklyInput,
        monthly: monthlyInput
    });
    tempEvent.save();
}

module.exports = makeEvent;