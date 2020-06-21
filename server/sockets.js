const { Types } = require('mongoose')
const { UserModel } = require('./models/user.model')
const { UniversityModel } = require('./models/university.model')
const { RoomModel } = require('./models/room.model')
const { MessageModel } = require('./models/message.model')

module.exports = io => {
  io.on('connection', socket => {
    socket.on('disconnect', () => console.log('user disconnected'))

    socket.join('all')

    socket.on('subscribe', room => socket.join(room))

    socket.on('unsubscribe', room => socket.leave(room))

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
        let message = null
        let studentRoom = null
        let room = null

        if (data.group) {
          studentRoom = await RoomModel.exists({ groupNumber: data.group.number })
        }

        if (!studentRoom && user.userRole === 'student') {
          room = new RoomModel({
            name: data.group.number,
            type: 'group',
            unreadCount: 0,
            groupNumber: data.group.number,
            usersIds: [user._id],
            users: [user]
          })

          message = await MessageModel.create({
            text: `${user.fullName} joined to group!`,
            roomIds: [room._id],
            userId: user._id,
            date: new Date(),
            type: 'info'
          })

          room.lastMessage = {
            text: message.text,
            time: message.date,
            type: message.type,
            user
          }

          await room.save()
        } else if (user.userRole === 'student') {
          room = await RoomModel.findOne({ groupNumber: data.group.number })
          room.usersIds.push(user._id)
          room.users.push(user)

          message = await MessageModel.create({
            text: `${user.fullName} joined to group!`,
            roomIds: [room._id],
            userId: user._id,
            date: new Date(),
            type: 'info'
          })

          room.lastMessage = {
            text: message.text,
            time: message.date,
            type: message.type,
            user
          }

          await room.save()
        }

        cb(false, user)
        socket.emit('initUser', user)
        if (room) {
          io.in('all').emit('updateLastMessage', [room])
          socket.emit('initChats', [room])
        }
      } catch (err) {
        console.error(err)
        cb(true, err)
      }
    })

    socket.on('user:sign-in', async function(data, cb) {
      if (!data.email || !data.password) {
        return cb(true, 'Invalid data')
      }

      try {
        const user = await UserModel.findOne({ email: data.email })

        if (!user || !user.checkPassword(data.password)) {
          return cb(true, 'Incorrect data')
        }

        cb(false, user)
        socket.emit('initUser', user)
      } catch (err) {
        return cb(true, err)
      }
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

    socket.on('get:messages', async function(roomId, cb) {
      if (!roomId) return cb(true, 'Expected room id')

      try {
        const messages = await MessageModel.find({
          roomIds: roomId
        })
        const messagesWithUser = []

        for (let i = 0; i < messages.length; i++) {
          const msg = messages[i]
          const user = await UserModel.findById(msg.userId)
          messagesWithUser.push({
            ...msg._doc,
            user
          })
        }

        cb(false, messagesWithUser)
      } catch (err) {
        console.error(err)
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

        console.log(user, interlocutor)

        room = new RoomModel({
          ...data,
          interlocutor,
          usersIds: data.users,
          groupNumber: null,
          users: [user, interlocutor]
        })

        const message = await MessageModel.create({
          text: `${user.fullName} created a chat`,
          roomIds: [room._id],
          userId: user._id,
          date: new Date(),
          type: 'info'
        })

        room.lastMessage = {
          ...message._doc,
          time: message.date,
          user
        }

        await room.save()

        io.emit('initChats', [room])
        cb(false, room)
      } catch (err) {
        console.error(err)
        cb(true, err)
      }
    })

    socket.on('new:message', async function({ text, roomId, userId, groups }, cb) {
      if (!text || !userId) return cb(true, 'invalidData')

      const user = await UserModel.findById(userId)
      let groupsNumbers = null
      let rooms = null
      let message = null

      try {
        if (groups) {
          groupsNumbers = groups.map(el => el.number)
          rooms = await RoomModel.find({ groupNumber: { $in: groupsNumbers } })

          message = await MessageModel.create({
            text,
            roomIds: rooms.map(el => el._id),
            userId,
            type: 'text',
            date: new Date()
          })
        } else {
          message = await MessageModel.create({
            text,
            roomIds: [roomId],
            userId,
            type: 'text',
            date: new Date()
          })
        }

        const chats = await RoomModel.updateMany(
          { _id: roomId || rooms.map(el => el._id) },
          {
            lastMessage: {
              text,
              time: message.date,
              type: message.type,
              user
            }
          }, { new: true }
        )
        const updatedChats = await RoomModel.find({ _id: roomId || rooms.map(el => el._id) })

        if (roomId) {
          io.in(roomId).emit('newMessage', {
            ...message._doc,
            user
          })
        }
        io.in('all').emit('updateLastMessage', updatedChats)
        cb(false, 'success')
      } catch (err) {
        console.error(err)
        cb(true, err)
      }
    })
  })
}