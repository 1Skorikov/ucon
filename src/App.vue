<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
const faker = require('faker')
window.faker = faker

export default {
  name: 'App',

  created() {
    this.$store.dispatch('chats/getUserChats')
  }
}
</script>
