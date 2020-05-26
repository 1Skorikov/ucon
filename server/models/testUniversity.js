const { Schema, model } = require('mongoose')

const testUnivSchema = new Schema({
  name: String
}, { collection: 'testUniversities' })

module.exports = model('testUnivModel', testUnivSchema)
