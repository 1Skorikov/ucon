<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import sockets from './mixins/sockets'

const faker = require('faker')
window.faker = faker

export default {
  name: 'App',

  mixins: [sockets],

  created() {
    this.$store.dispatch('chats/getUserChats')
    this.fetchData()
  },

  methods: {
    fetchData() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return

      this.$socket.emit(
        'user:getData',
        userId,
        (err, res) => console.warn(err, res)
      )
    }
  }
}
</script>
