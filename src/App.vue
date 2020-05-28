<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import sockets from './mixins/sockets'
import { mapState } from 'vuex'

export default {
  name: 'App',

  mixins: [sockets],

  async created() {
    this.$q.loading.show()
    await this.fetchUser()
    setTimeout(() => {
      this.fetchChats()
    }, 2000)
    this.$q.loading.hide()
  },

  methods: {
    async fetchUser() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        await this._getUser(userId)
      } catch (err) {
        console.log(err)
      }
    },

    async fetchChats() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        const chats = await this._getChats(userId)
        console.log(userId)
        console.log('Chats found - ', chats)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
