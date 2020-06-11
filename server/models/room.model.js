const { Schema, model } = require('mongoose')
const { userSchema } = require('./user.model')

const roomSchema = new Schema({
  name: String,
  type: String,
  unreadCount: Number,
  groupNumber: Schema.Types.Mixed,
  lastMessage: {
    text: String,
    time: Date,
    user: Object,
    type: String
  },
  usersIds: Array,
  users: [userSchema],
  interlocutor: userSchema
}, { collection: 'rooms', typeKey: '$type' })

module.exports = {
  RoomModel: model('Room', roomSchema),
  roomSchema
}
