const UserModel = require('./models/user.model')
const UniversityModel = require('./models/university.model')

module.exports = io => {
  io.on('connection', socket => {
    console.log('a user connected', socket.id)
    socket.on('disconnect', () => console.log('user disconnected'))

    socket.on('user:sign-up', async (data, cb) => {
      if (!data.email || !data.password) {
        return cb(true, 'Invalid data')
      }

      const exist = await UserModel.exists({ email: data.email })
      if (exist) return cb(true, 'This email is already taken')

      const {
        fullName,
        email,
        nickname,
        userRole,
        teacherUID,
        password
      } = data

      UserModel.create({
        fullName,
        email,
        nickname,
        userRole,
        teacherUID,
        password
      }).then(user => cb(false, user))
    })

    socket.on('user:sign-in', (data, cb) => {
      console.log('132', data)

      if (!data.email || !data.password) {
        return cb('invalidData')
      }

      UserModel.findOne({ email: data.email })
        .then(user => {
          if (!user || !user.checkPassword(data.password)) {
            return cb('invalidData')
          }

          cb('success')
        })
        .catch(err => {
          console.log('User.findOne', err)
          cb(err)
        })
    })

    socket.on('get:universities', async (cb) => {
      try {
        const universities = await UniversityModel.find()
        cb(false, universities)
      } catch (err) {
        cb(true, err)
      }
    })
  })
}
