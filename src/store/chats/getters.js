const userChats = (state, getters, rootState, rootGetters) => (filterBy = 'all') => {
  let chats = []

  if (filterBy === 'all') {
    chats = state.chats
  } else if (filterBy === 'group') {
    chats = state.chats.filter(c => {
      if (c.type === 'private') {
        return c.interlocutor.group && c.interlocutor.group.number === rootGetters['user/me'].group.number
      } else if (c.type === 'group') {
        return c.groupNumber === rootGetters['user/me'].group.number
      }
    })
  } else {
    chats = state.chats.filter(c => {
      if (c.type === 'group') return
      if (c.type === 'private') return c.interlocutor.userRole === filterBy
    })
  }

  return chats.slice().sort((a, b) => {
    console.log(123, a.lastMessage.time)
    return new Date(b.lastMessage.time) - new Date(a.lastMessage.time)
  })
}

const chatById = state => id => {
  return state.chats.find(c => c._id === id)
}

export { userChats, chatById }
