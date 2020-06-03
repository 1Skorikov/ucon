import Vue from 'vue'

function initMessages(state, data) {
  const ids = data.map(e => e._id)

  console.log('initMessages')

  state.messages = [
    ...state.messages
      .filter(e => !ids.includes(e._id)),
    ...data
  ]
}

function appendMessage(state, message = {}) {
  // uncomment after cordova functionality
  // const index = state.messages.findIndex(e => e._id === message._id)
  const index = -1

  console.log('appendMessage')

  if (index === -1) {
    state.messages.push(message)
  } else {
    Vue.set(state.messages, index, message)
  }
}

export { appendMessage, initMessages }
