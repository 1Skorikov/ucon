export function updateUserChats(state, chats) {
  state.chats = chats
}

export function initChats(state, payload) {
  state.chats = [...state.chats, ...payload]
}
