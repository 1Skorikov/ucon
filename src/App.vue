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
    fetchData() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return

      this.$socket.emit('get:user',
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
  },

  computed: {
    ...mapState('user', ['user'])
  }
}
</script>
