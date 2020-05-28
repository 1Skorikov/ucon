const { UserModel } = require('./models/user.model')
const { UniversityModel } = require('./models/university.model')
const { RoomModel } = require('./models/room.model')
const { Types } = require('mongoose')

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
        const university = await UniversityModel.findById(data.universityId)
        const user = await UserModel.create({ ...data, university })
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

    socket.on('get:user', async function(userId, cb) {
      try {
        const user = await UserModel.findById(userId).select('-passwordHash')
        if (!user) return cb(true, 'Can not find user')
        socket.emit('initUser', user)
        cb(false, user)
      } catch (err) {
        cb(true, err)
      }
    })

    socket.on('get:chats', async function(userId, cb) {
      try {
        console.log('get:chats', userId)
        const chats = await RoomModel.find({ users: { $elemMatch: { _id: Types.ObjectId(userId) } } })

        socket.emit('initChats', chats)
        cb(false, chats)
      } catch (err) {
        cb(true, err)
      }
    })

    socket.on('search:recipient', async function(query, cb) {
      if (!query) return cb(true, 'invalid query')

      try {
        const recipients = await UserModel.findByName(query).select('-passwordHash')
        cb(false, recipients)
      } catch (err) {
        cb(true, 'Can not find')
      }
    })

    socket.on('search:recipientByGroup', async function(id, cb) {
      if (!id) return cb(true, 'invalid query')

      try {
        const recipients = await UserModel.find({ 'group.id': id }).select('-passwordHash')
        cb(false, recipients)
      } catch (err) {
        cb(true, 'Can not find')
      }
    })

    socket.on('search:recipientByFaculty', async function(id, cb) {
      if (!id) return cb(true, 'invalid query')

      try {
        const recipients = await UserModel.find({ 'faculty.id': id }).select('-passwordHash')
        cb(false, recipients)
      } catch (err) {
        cb(true, 'Can not find')
      }
    })

    socket.on('newRoom', async function(data, cb) {
      if (!data.users.length) return cb(true, 'invalidData')

      let room = null

      try {
        const users = await UserModel.find({ _id: { $in: data.users } })
        room = await RoomModel.create({
          ...data,
          usersIds: data.users,
          users
        })
        console.log('room', room)
        cb(false, room)
        io.emit('initChats', [room])
      } catch (err) {
        console.error(err)
        cb(true, err)
      }

      cb(false, room)
    })
  })
}
