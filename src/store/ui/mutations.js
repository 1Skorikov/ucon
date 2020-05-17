export const updateActiveChatsList = (state, name) => {
  state.activeChatsList = name
}

export const toggleDrawerState = state => {
  state.drawerState = !state.drawerState
}
