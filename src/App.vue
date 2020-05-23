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

  mounted() {
    this.$socket.emit(
      'user:getData',
      this.$q.localStorage.getItem('userId'),
      (err, res) => {
        console.warn(err)
      }
    )
  }
}
</script>
