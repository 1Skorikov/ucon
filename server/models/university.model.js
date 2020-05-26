const { Schema, model } = require('mongoose')
const { facultySchema } = require('./faculty.model')

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
  faculties: [facultySchema]
}, { collection: 'universities' })

module.exports = {
  universitySchema,
  UniversityModel: model('universityModel', universitySchema)
}
