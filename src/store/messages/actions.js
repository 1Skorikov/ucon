function SA_message({ commit }, payload) {
  commit('addMessage', payload)
}

function SA_initMessages({ commit }, payload) {
  commit('initMessages', payload)
}

export { SA_message, SA_initMessages }
