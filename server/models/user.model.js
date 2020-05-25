const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  university: Object,
  faculty: Object,
  specialty: Object,
  groupNumber: Number,
  fullName: String,
  email: String,
  userRole: String,
  teacherUID: String,
  passwordHash: String
}, { collection: 'users' })

userSchema
  .virtual('password')
  .set(function(password) {
    this.passwordHash = this.encryptPassword(password)
  })
  .get(() => 'secure password')

userSchema.methods = {
  encryptPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  },
  checkPassword: function(password) {
    return bcrypt.compareSync(password, this.passwordHash)
  }
}

module.exports = model('UserModel', userSchema)
