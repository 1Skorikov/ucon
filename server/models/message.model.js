const { Schema, model } = require('mongoose')
// const { userSchema } = require('./user.model')

const messageSchema = new Schema({
  text: String,
  roomId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  date: Date
}, { collection: 'messages' })

module.exports = {
  MessageModel: model('Message', messageSchema),
  messageSchema
}
