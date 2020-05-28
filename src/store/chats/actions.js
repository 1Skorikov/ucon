import { date } from 'quasar'
const faker = require('faker')

export function getUserChats({ commit }) {
  const chats = []

  for (let i = 0; i < 50; i++) {
    const timeStamp = faker.date.recent()
    const formattedString = date.formatDate(timeStamp, 'hh:mm')

    const conversationObj = {
      id: faker.random.uuid(),
      unreadCount: faker.random.arrayElement([1, 2, 3, 0, 0, 0]),
      lastMessage: {
        text: faker.random.arrayElement([faker.lorem.sentence(), '']),
        time: formattedString,
        sent: faker.random.boolean(), // show check icon only if current user === user in this obj
        user: {}
      },
      user: {
        id: faker.random.uuid(),
        fullName: faker.name.findName(),
        avatar: faker.random.arrayElement([faker.internet.avatar(), null]),
        role: faker.random.arrayElement(['teacher', 'student']),
        groupId: faker.random.arrayElement([408, 400, 409, 403])
      }
    }

    chats.push(conversationObj)
  }

  commit('updateUserChats', chats)
}

export function SA_initChats({ commit }, payload) {
  commit('initChats', payload)
}
