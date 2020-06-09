<template>
  <div class="chat-message q-pr-sm q-pl-sm" style="width: 100%;">
    <q-chat-message
      v-if="message.type === 'info'"
      :label="message.text"
      class="text-bold"
    />

    <q-chat-message
      v-else
      :name="messageInfo.senderName"
      :text="[messageInfo.text]"
      :stamp="messageInfo.time"
      :sent="messageInfo.sent"
      name-sanitize
      text-sanitize
      bg-color="white"
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
          avatar: this.isMyMessage ? null : msg.user.initials,
          sent: this.me._id === msg.user._id,
          time: messageTime(msg.date)
        }
      }

      return msg
    },

    isMyMessage() {
      return this.message.user._id === this.me._id
    },

    ...mapGetters('user', ['me'])
  }
}
</script>

<style lang="scss">
.q-message-label {
  width: 70%;
  margin: 8px auto;
  border-radius: 10px;
}

.q-message-name {
  padding: 8px 8px 0;
  font-weight: 500;
  border-radius: 4px 4px 0 0;
  background-color: #fff;

  &--received {
    background-color: #fff;
  }
}

.q-message-text {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
