const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  nickname: String,
  email: String,
  passwordHash: String
})

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
