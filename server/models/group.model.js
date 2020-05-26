const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
  number: {
    type: Number,
    unique: true
  }
}, { collection: 'groups' })

module.exports = {
  groupSchema,
  GroupModel: model('groupModel', groupSchema)
}
