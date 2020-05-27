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

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.$q.loading.show()
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        await this._getUser(userId)
      } catch (err) {
        console.log(err)
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>
