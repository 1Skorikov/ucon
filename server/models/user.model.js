const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
  university: Object,
  faculty: Object,
  specialty: Object,
  group: Object,
  fullName: String,
  initials: String,
  email: String,
  userRole: String,
  teacherUID: String,
  passwordHash: String
}, { collection: 'users' })

userSchema.virtual('password')
  .set(function(password) {
    this.passwordHash = this.encryptPassword(password)
  })
  .get(() => 'secure password')

userSchema.virtual('name')
  .set(function(name) {
    this.fullName = name
    this.initials = name.split(' ').map(e => e.charAt(0)).join('')
  })
  .get(function() { return this.fullName })

userSchema.methods = {
  encryptPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  },
  checkPassword: function(password) {
    return bcrypt.compareSync(password, this.passwordHash)
  }
}

userSchema.statics = {
  findByName(name) {
    return this.find({ fullName: new RegExp(name, 'i') })
  }
}

module.exports = {
  userSchema,
  UserModel: model('UserModel', userSchema)
}
