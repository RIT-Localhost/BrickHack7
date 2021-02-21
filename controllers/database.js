const mongoose = require('mongoose');
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@snowman.amzug.mongodb.net/snowman?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(err => console.error(err));

const eventSchema = new mongoose.Schema({
  server: String,
  channel: String,
  user: String,
  description: String,
  datetime: Date,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
