const { Schema, model } = require('mongoose')

const chatSchema = new Schema({
  name: String,
  unreadMessagesCount: Number,
  lastMessage: {
    text: String,
    time: Date,
    user: Object
  },
  user: Object
})

const Chat = model('Chat', chatSchema)

module.exports = {
  Chat
}
