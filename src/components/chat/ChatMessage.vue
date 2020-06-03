<template>
  <div class="chat-message">
    <!-- <q-chat-message
      name="Ivan"
      name-sanitize
      :text="['hey, how are you?']"
      text-sanitize
      avatar="https://cdn.quasar.dev/img/avatar3.jpg"
      stamp="7 minutes ago"
      sent
      bg-color="amber-7"
    />
    <q-chat-message
      name="Jane"
      name-sanitize
      :text="[
        'doing fine, how r you?',
        'I just feel like typing a really, really, REALY long message to annoy you...'
      ]"
      text-sanitize
      avatar="https://cdn.quasar.dev/img/avatar5.jpg"
      size="6"
      stamp="4 minutes ago"
      text-color="white"
      bg-color="primary"
    /> -->

    <q-chat-message
      :name="messageInfo.senderName"
      name-sanitize
      :text="[messageInfo.text]"
      text-sanitize
      :stamp="messageInfo.time"
      :sent="messageInfo.sent"
    >
      <template v-slot:avatar v-if="messageInfo.avatar">
        <q-avatar size="48px" class="shadow-1">
          <span>{{ messageInfo.avatar }}</span>
        </q-avatar>
      </template>
    </q-chat-message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChatMessage',

  props: {
    message: {
      type: Object,
      required: true
    },

    chatType: {
      type: String,
      required: true
    }
  },

  computed: {
    messageInfo() {
      const msg = this.message

      if (this.chatType === 'private') {
        return {
          text: msg.text,
          senderName: null,
          avatar: null,
          sent: this.me._id === msg.user._id,
          time: msg.date
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
