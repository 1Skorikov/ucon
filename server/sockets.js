const UserModel = require('./models/user.model')
const UniversityModel = require('./models/university.model')

module.exports = io => {
  io.on('connection', socket => {
    socket.on('disconnect', () => console.log('user disconnected'))

    socket.on('user:sign-up', async function(data, cb) {
      if (!data.email || !data.password) {
        return cb(true, 'Invalid data')
      }

      const exist = await UserModel.exists({ email: data.email })
      if (exist) {
        return cb(true, 'This email is already taken')
      }

      try {
        const user = await UserModel.create(data)
        cb(false, user)
        socket.emit('initUser', user)
      } catch (err) {
        cb(true, err)
      }
    })

    socket.on('user:sign-in', (data, cb) => {
      if (!data.email || !data.password) {
        return cb(true, 'Invalid data')
      }

      UserModel.findOne({ email: data.email })
        .then(user => {
          if (!user || !user.checkPassword(data.password)) {
            return cb(true, 'Invalid data')
          }
          cb(false, user)
          socket.emit('initUser', user)
        })
        .catch(err => cb(true, err))
    })

    socket.on('get:universities', async function(cb) {
      try {
        const universities = await UniversityModel.find()
        cb(false, universities)
      } catch (err) {
        cb(true, err)
      }
    })

    socket.on('user:getData', async function(userId, cb) {
      try {
        const user = await UserModel.findById(userId).select('-passwordHash')
        if (!user) return cb(false, 'Can\'t find user')
        socket.emit('initUser', user)
      } catch (err) {
        cb(true, err)
      }
    })
  })
}
