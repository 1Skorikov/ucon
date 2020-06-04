<template>
  <q-page class="chat-page">
    <chat-message
      v-for="(message, i) in messages"
      :key="i"
      :message="message"
      :chatType="chat.type"
    />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Chat',

  props: {
    id: {
      type: String,
      required: true
    }
  },

  components: {
    ChatMessage: () => import('components/chat/ChatMessage')
  },

  computed: {
    messages() {
      return this.chatMessages(this.id)
    },

    chat() {
      return this.chatById(this.id)
    },

    ...mapGetters('messages', ['chatMessages']),
    ...mapGetters('chats', ['chatById'])
  },

  async created() {
    this.$socket.emit('subscribe', this.id)
    this.$q.loading.show()
    await this._getMessages(this.id)
    this.$q.loading.hide()
  },

  destroyed() {
    this.$socket.emit('unsubscribe', this.id)
  }
}
</script>

<style lang="scss" scoped>
.chat-page {
  padding-top: 15px;
}
</style>
