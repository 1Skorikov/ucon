export function updateUserChats(state, chats) {
  state.chats = chats
}

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
