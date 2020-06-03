<template>
  <q-layout view="hHh Lpr fFf">
    <app-header :title="chatTitle" :reveal="false">
      <template #left>
        <q-btn dense flat round icon="arrow_back_ios" @click="$router.back()" />
      </template>
    </app-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <chat-input :id="id" />
  </q-layout>
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
    AppHeader: () => import('components/global/AppHeader'),
    ChatInput: () => import('components/chat/ChatInput')
  },

  computed: {
    chat() {
      return this.chatById(this.id)
    },

    chatTitle() {
      return this.chat.interlocutor.fullName
    },

    ...mapGetters('chats', ['chatById'])
  }
}
</script>
