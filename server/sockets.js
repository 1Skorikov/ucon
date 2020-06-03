const { Types } = require('mongoose')
const { UserModel } = require('./models/user.model')
const { UniversityModel } = require('./models/university.model')
const { RoomModel } = require('./models/room.model')
const { MessageModel } = require('./models/message.model')

module.exports = io => {
  io.on('connection', socket => {
    socket.on('disconnect', () => console.log('user disconnected'))

    socket.on('subscribe', room => {
      console.log('join', room)
      socket.join(room)
    })

    socket.on('unsubscribe', room => {
      console.log('leave')
      socket.leave(room)
    })

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
        const chats = await RoomModel.find({
          users: { $elemMatch: { _id: Types.ObjectId(userId) } }
        })

        const tmpChats = []

        for (let i = 0; i < chats.length; i++) {
          const c = chats[i]

          if (c.type === 'private') {
            const inter = await UserModel.findById(
              Types.ObjectId(c.usersIds.find(c => c !== userId))
            )

            tmpChats.push({
              ...c._doc,
              interlocutor: inter
            })
          } else {
            tmpChats.push(c)
          }
        }

        socket.emit('initChats', tmpChats)
        cb(false, tmpChats)
      } catch (err) {
        cb(true, err)
      }
    })

    socket.on('search:recipient', async function(query, cb) {
      if (!query) return cb(true, 'invalid query')

      try {
        const recipients = await UserModel.findByName(query).select(
          '-passwordHash'
        )
        cb(false, recipients)
      } catch (err) {
        cb(true, 'Can not find')
      }
    })

    socket.on('search:recipientByGroup', async function(id, cb) {
      if (!id) return cb(true, 'invalid query')

      try {
        const recipients = await UserModel.find({ 'group.id': id }).select(
          '-passwordHash'
        )
        cb(false, recipients)
      } catch (err) {
        cb(true, 'Can not find')
      }
    })

    socket.on('search:recipientByFaculty', async function(id, cb) {
      if (!id) return cb(true, 'invalid query')

      try {
        const recipients = await UserModel.find({ 'faculty.id': id }).select(
          '-passwordHash'
        )
        cb(false, recipients)
      } catch (err) {
        cb(true, 'Can not find')
      }
    })

    socket.on('new:room', async function(data, cb) {
      if (!data.users.length) return cb(true, 'invalidData')

      let room = null

      try {
        const user = await UserModel.findById(data.me)
        const interlocutor = await UserModel.findById(data.interlocutor)

        room = await RoomModel.create({
          ...data,
          interlocutor,
          usersIds: data.users,
          users: [user, interlocutor],
          lastMessage: {
            text: `${user.fullName} created a chat`,
            time: new Date(),
            user
          }
        })

        io.emit('initChats', [room])
        cb(false, room)
      } catch (err) {
        console.error(err)
        cb(true, err)
      }
    })

    socket.on('new:message', async function(data, cb) {
      if (!data.text || !data.chatId || !data.userId) return cb(true, 'invalidData')

      try {
        const user = await UserModel.findById(data.userId)
        io.in(data.chatId).emit('newMessage', {
          chatId: data.chatId,
          text: data.text + '. From server',
          user,
          date: new Date()
        })
        cb(false, 'success')
      } catch (err) {
        console.error(err)
        cb(true, err)
      }
    })
  })
}
