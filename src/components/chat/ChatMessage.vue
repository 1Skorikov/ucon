<template>
  <div class="chat-message" style="width: 100%;">
    <q-chat-message
      :name="messageInfo.senderName"
      name-sanitize
      :text="[messageInfo.text]"
      text-sanitize
      :stamp="messageInfo.time"
      :sent="messageInfo.sent"
    >
      <template v-slot:avatar v-if="messageInfo.avatar">
        <q-avatar
          class="q-message-avatar shadow-1"
          :class="{
            'q-message-avatar--received': !messageInfo.sent,
            'q-message-avatar--sent': messageInfo.sent
          }"
          size="48px"
        >
          <span>{{ messageInfo.avatar }}</span>
        </q-avatar>
      </template>
    </q-chat-message>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { messageTime } from '../../helpers.js'

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
          time: messageTime(msg.date)
        }
      } else if (this.chatType === 'group') {
        return {
          text: msg.text,
          senderName: msg.user.fullName,
          avatar: msg.user.initials,
          sent: this.me._id === msg.user._id,
          time: messageTime(msg.date)
        }
      }

      return msg
    },

    ...mapGetters('user', ['me'])
  }
}
</script>

<style>
</style>
