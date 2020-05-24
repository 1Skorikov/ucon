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
        'get:user',
        userId,
        (err, res) => {
          if (err) {
            console.error(err, res)
            this.$q.localStorage.set('userId', '')
            this.$q.localStorage.set('userLoggedIn', false)
            this.$router.push({ name: 'SignIn' })
          }
        }
      )
    }
  }
}
</script>
