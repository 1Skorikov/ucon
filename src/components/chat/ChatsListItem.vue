<template>
  <q-item clickable v-ripple @click="openChat">
    <q-item-section avatar>
      <q-avatar size="48px" class="shadow-1 bg-primary text-white text-bold">
        <span>{{ chatInfo.initials }}</span>
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-bold" lines="1">
        {{ chatInfo.fullName }}
      </q-item-label>

      <q-item-label caption>
        {{ chatInfo.lastMessage.text | truncateText }}
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

  filters: {
    truncateText(value) {
      return `${value.substring(0, 70)} ${value.length > 70 ? '...' : ''}`
    }
  },

  computed: {
    chatInfo() {
      const lastMessage = this.chat.lastMessage
      const formattedString = lastMessage ? date.formatDate(lastMessage.time, 'hh:mm') : null
      const msg = lastMessage
        ? {
          text: this.me._id === lastMessage.user._id
            ? `Me: ${lastMessage.text}`
            : this.chat.type === 'group'
              ? `${lastMessage.user.fullName}: ${lastMessage.text}`
              : lastMessage.text,
          time: formattedString,
          user: lastMessage.user
        }
        : {
          text: '',
          time: '',
          user: null
        }

      if (this.chat.type === 'private') {
        return {
          fullName: this.chat.interlocutor.fullName,
          unreadCount: this.chat.unreadCount || 0,
          initials: this.chat.interlocutor.initials,
          lastMessage: msg
        }
      } else if (this.chat.type === 'group') {
        return {
          fullName: this.chat.groupNumber,
          unreadCount: this.chat.unreadCount || 0,
          initials: this.chat.groupNumber,
          lastMessage: msg
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
