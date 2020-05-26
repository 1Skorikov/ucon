const { Schema, model } = require('mongoose')

const specialtySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  groups: [{ number: Number }]
}, { collection: 'specialties' })

const SpecialtyModel = model('specialtyModel', specialtySchema)
module.exports = { specialtySchema, SpecialtyModel }
