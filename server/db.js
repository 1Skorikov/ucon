const mongoose = require('mongoose')
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}
const dbUrl = 'mongodb+srv://admin:testtest@cluster0-wwyk9.mongodb.net/test?retryWrites=true&w=majority'
const createTestData = require('./models/test-data')

mongoose
  .connect(dbUrl, mongooseConfig)
  .then(() => {
    console.log('db connected')
    // createTestData()
  })
  .catch(error => console.error(error))
