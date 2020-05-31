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
    await this.fetchChats()
    this.$q.loading.hide()
  },

  methods: {
    async fetchUser() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        await this._getUser(userId)
      } catch (err) {
        console.error(err)
      }
    },

    async fetchChats() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        const chats = await this._getChats(userId)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
