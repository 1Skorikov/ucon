const { Schema, model } = require('mongoose')

const specialtySchema = new Schema({
  name: {
    type: String,
    unique: false // !!!!
  }
}, { collection: 'specialties' })

module.exports = model('specialtyModel', specialtySchema)
