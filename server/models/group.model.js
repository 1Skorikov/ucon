const { Schema, model } = require('mongoose')

const groupSchema = new Schema({
  universityId: {
    type: String,
    required: true
  },
  facultyId: {
    type: String,
    required: true
  },
  specialtyId: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    unique: true
  }
}, { collection: 'groups' })

module.exports = model('groupModel', groupSchema)
