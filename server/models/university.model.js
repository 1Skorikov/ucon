const { Schema, model } = require('mongoose')

const universitySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  site: String,
  country: String,
  address: String,
  phone: String,
  foundedYear: Number,
  faculties: Array
}, { collection: 'universities' })

module.exports = model('universityModel', universitySchema)
