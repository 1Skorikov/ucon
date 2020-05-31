<template>
  <q-item clickable v-ripple @click="openChat">
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
import { date } from 'quasar'

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
      const lastMessage = this.chat.lastMessage
      const formattedString = date.formatDate(lastMessage.time, 'hh:mm')

      if (this.chat.type === 'private') {
        return {
          fullName: this.chat.interlocutor.fullName,
          lastMessage: {
            text: lastMessage.text,
            time: formattedString,
            user: lastMessage.user
          },
          unreadCount: this.chat.unreadCount || 0,
          initials: this.chat.interlocutor.initials
        }
      }

      return {}
    },

    ...mapGetters('user', ['me'])
  },

  methods: {
    openChat() {
      this.$router.push({
        name: 'Chat',
        params: {
          id: this.chat._id
        }
      })
    }
  }
}
</script>

<style>
</style>
