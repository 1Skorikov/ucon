const chatMessages = state => id => {
  return state.messages
    .filter(msg => msg.roomIds.includes(id))
}

export { chatMessages }
