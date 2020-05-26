const { Schema, model } = require('mongoose')
const { specialtySchema } = require('./specialty.model')

const facultySchema = new Schema({
  name: String,
  specialties: [specialtySchema]
}, { collection: 'faculties' })

const FacultyModel = model('facultyModel', facultySchema)
module.exports = { facultySchema, FacultyModel }
