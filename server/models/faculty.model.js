const { Schema, model } = require('mongoose')

const facultySchema = new Schema({
  name: {
    type: String,
    unique: true
  }
}, { collection: 'faculties' })

module.exports = model('facultyModel', facultySchema)
