const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
  number: {
    type: Number,
    unique: true
  }
}, { collection: 'groups' })

module.exports = model('groupModel', groupSchema)
