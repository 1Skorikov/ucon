const { Schema, model } = require('mongoose')
const { userSchema } = require('./user.model')

const roomSchema = new Schema({
  name: String,
  type: String,
  unreadCount: Number,
  lastMessage: {
    text: String,
    time: Date,
    user: Object
  },
  usersIds: Array,
  users: [userSchema],
  interlocutor: userSchema
}, { collection: 'rooms' })

module.exports = {
  RoomModel: model('Room', roomSchema),
  roomSchema
}
