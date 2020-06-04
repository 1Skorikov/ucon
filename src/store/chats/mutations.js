export function initChats(state, payload) {
  if (!payload.length) {
    state.chats = []
    return
  }
  const ids = payload.map(e => e._id)

  state.chats = [
    ...state.chats.filter(c => !ids.includes(c._id)),
    ...payload
  ]
}

export function updateLastMessage(state, data) {
  const chat = state.chats.find(e => e._id === data._id)
  if (!chat) return
  chat.lastMessage = data.lastMessage
}
