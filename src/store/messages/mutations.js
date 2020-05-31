function addMessage(state, payload) {
  state.messages.push(payload)
}

function initMessages(state, payload) {
  state.messages = payload
}

export { addMessage, initMessages }
