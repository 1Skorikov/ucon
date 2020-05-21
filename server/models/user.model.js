const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  // universityId: { type: String, required: true },
  // facultyId: { type: String, required: true },
  // specialtyId: { type: String, required: true },
  // groupId: { type: String, required: true },
  fullName: String,
  email: String,
  nickname: String,
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
