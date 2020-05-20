const UserModel = require('./models/user.model')

module.exports = io => {
  io.on('connection', socket => {
    console.log('a user connected', socket.id)
    socket.on('disconnect', () => console.log('user disconnected'))

    socket.on('user:sign-up', (data, cb) => {
      if (!data.email || !data.password) {
        return cb('invalidData')
      }

      UserModel.findOne({ email: data.email })
        .then((user) => {
          if (user) return cb('userExist')

          const newUser = UserModel.create({
            nickname: data.nickname,
            email: data.email,
            password: data.password
          }).then(data => console.log(data))
        })
        .catch((err) => cb(err))
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
  })
}
