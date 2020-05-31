const { Schema, model } = require('mongoose')
const { userSchema } = require('./user.model')

const messageSchema = new Schema({
  text: String,
  chatId: Schema.Types.ObjectId,
  user: userSchema
}, { collection: 'messages' })

module.exports = {
  MessageModel: model('Message', messageSchema),
  messageSchema
}
