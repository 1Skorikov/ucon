const mongoose = require('mongoose')
const mongooseConfig = { useNewUrlParser: true, useUnifiedTopology: true }
const dbUrl = 'mongodb+srv://admin:testtest@cluster0-wwyk9.mongodb.net/test?retryWrites=true&w=majority'

mongoose
  .connect(dbUrl, mongooseConfig)
  .then(() => console.log('db connected'))
  .catch(error => console.error(error))
