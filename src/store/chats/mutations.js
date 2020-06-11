import { LocalStorage } from 'quasar'

export function initChats(state, payload) {
  if (!payload.length) {
    state.chats = []
    return
  }

  const myChats = payload.filter(el => el.usersIds.includes(LocalStorage.getItem('userId')))
  const ids = myChats.map(e => e._id)

  console.log('myChats', myChats)

  state.chats = [
    ...state.chats.filter(c => !ids.includes(c._id)),
    ...myChats
  ]
}

export function updateLastMessage(state, data) {
  const newChats = Array.isArray(data) ? data : [data]
  const chat = state.chats.find(e => newChats.map(e => e._id).includes(e._id))

  if (!chat) return
  chat.lastMessage = newChats.find(e => e._id === chat._id).lastMessage
}
