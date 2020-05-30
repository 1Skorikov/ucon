<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-avatar size="48px" class="shadow-1">
        <span>{{ chatInfo.initials }}</span>
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-bold" lines="1">
        {{ chatInfo.fullName }}
      </q-item-label>

      <q-item-label caption>
        {{ chatInfo.lastMessage.text }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label>
        {{ chatInfo.lastMessage.time }}
      </q-item-label>

      <q-item-label v-if="chatInfo.unreadCount">
        <q-badge color="secondary">{{ chatInfo.unreadCount }}</q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChatsListItem',

  props: {
    chat: {
      type: Object,
      required: true
    }
  },

  computed: {
    chatInfo() {
      if (this.chat.type === 'private') {
        return {
          fullName: this.chat.interlocutor.fullName,
          lastMessage: this.chat.lastMessage || '',
          unreadCount: this.chat.unreadCount || 0,
          initials: this.chat.interlocutor.initials
        }
      }

      return {}
    },

    ...mapGetters('user', ['me'])
  }
}
</script>

<style>
</style>
