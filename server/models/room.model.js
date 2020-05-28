const { Schema, model } = require('mongoose')

const roomSchema = new Schema({
  name: String,
  type: String,
  unreadCount: Number,
  lastMessage: {
    text: String,
    time: Date,
    user: Object
  },
  users: Object
}, { collection: 'rooms' })

module.exports = {
  RoomModel: model('Room', roomSchema),
  roomSchema
}
