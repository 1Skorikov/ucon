<template>
  <q-layout class="chat-layout" view="hHh Lpr fFf">
    <app-header :title="chatTitle" :reveal="false">
      <template #left>
        <q-btn dense flat round icon="arrow_back_ios" @click="$router.back()" />
      </template>
    </app-header>

    <q-page-container>
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
        <router-view />
      </q-scroll-area>
    </q-page-container>

    <chat-input :id="id" />
  </q-layout>
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
    AppHeader: () => import('components/global/AppHeader'),
    ChatInput: () => import('components/chat/ChatInput')
  },

  computed: {
    chat() {
      return this.chatById(this.id)
    },

    chatTitle() {
      return this.chat.type === 'private' ? this.chat.interlocutor.fullName : this.chat.name
    },

    ...mapGetters('chats', ['chatById'])
  },

  mounted() {
    this.$nextTick(this.setScrollPosition)
  },

  methods: {
    setScrollPosition(smooth = false) {
      const area = this.$refs.scrollArea
      const scrollTarget = area.getScrollTarget()
      area.setScrollPosition(scrollTarget.scrollHeight, smooth ? 500 : 0)
    }
  },

  sockets: {
    newMessage() {
      this.setScrollPosition(true)
    }
  }
}
</script>

<style lang="scss">
.chat-layout {
  background-color: #f2f2f3;
}
</style>
