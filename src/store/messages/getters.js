const chatMessages = state => id => {
  return state.messages
    .filter(msg => msg.chatId === id)
}

export { chatMessages }
