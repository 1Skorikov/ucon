const userChats = (state, getters, rootState, rootGetters) => (filterBy = 'all') => {
  if (filterBy === 'all') return state.chats

  if (filterBy === 'group') {
    return state.chats.filter(c =>
      c.interlocutor.group.number === rootGetters['user/me'].group.number
    )
  }

  return state.chats.filter(c => c.interlocutor.userRole === filterBy)
}

export { userChats }
