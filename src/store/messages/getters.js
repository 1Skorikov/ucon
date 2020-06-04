const chatMessages = state => id => {
  return state.messages
    .filter(msg => msg.roomId === id)
}

export { chatMessages }
