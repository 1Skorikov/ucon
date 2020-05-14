const userChats = (state) => (filterBy) => {
  if (filterBy === 'all') return state.chats
  if (filterBy === 'group') return []
  return state.chats.filter(e => e.user.role === filterBy)
}

export { userChats }
