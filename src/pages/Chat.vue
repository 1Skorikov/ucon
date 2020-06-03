<template>
  <q-page class="chat-page row justify-center">
    <q-scroll-area
      class="q-pr-sm q-pl-sm"
      style="height: calc(100vh - 100px); width: 100%;"
      :thumb-style="{
        right: '2px',
        borderRadius: '5px',
        width: '4px',
        opacity: 0.5
      }"
      ref="scrollArea"
    >
      <chat-message
        v-for="(message, i) in messages"
        :key="i"
        :message="message"
        :chatType="chat.type"
      />
    </q-scroll-area>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { scroll } from 'quasar'

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

  data() {
    return {
      position: 300
    }
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

  mounted() {
    this.$socket.emit('subscribe', this.id)
    this.setScrollPosition()
  },

  destroyed() {
    this.$socket.emit('unsubscribe', this.id)
  },

  methods: {
    setScrollPosition() {
      const scrollTarget = this.$refs.scrollArea.getScrollTarget()
      this.$refs.scrollArea.setScrollPosition(scrollTarget.scrollHeight)
      this.position = Math.floor(Math.random() * 1001) * 20
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-page {
  padding-top: 15px;
  background-color: #f6f8fa;
}
</style>
