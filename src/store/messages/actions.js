function SA_newMessage({ commit }, payload) {
  commit('appendMessage', payload)
}

function SA_initMessages({ commit }, payload) {
  commit('initMessages', payload)
}

export { SA_newMessage, SA_initMessages }
