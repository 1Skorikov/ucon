const { Schema, model } = require('mongoose')

const specialtySchema = new Schema({
  name: {
    type: String,
    unique: true
  }
}, { collection: 'specialties' })

module.exports = model('specialtyModel', specialtySchema)
