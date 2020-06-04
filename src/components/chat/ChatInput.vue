<template>
  <q-footer>
    <q-toolbar style="background-color: #E9EFF4;" class="text-black row">
      <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
      <q-input
        v-model="message"
        rounded
        outlined
        dense
        borderless
        autogrow
        class="col-grow q-mr-sm"
        input-class="chat-input"
        bg-color="white"
        placeholder="Type a message"
        ref="messageInput"
        @keydown.enter.ctrl="sendMessage"
      />
      <q-btn @click="sendMessage" round flat icon="send" />
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: 'ChatInput',

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      message: ''
    }
  },

  methods: {
    async sendMessage() {
      if (!this.message) return

      await this._sendMessage({
        text: this.message,
        roomId: this.id
      })

      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-input {
  border: none;

  :before {
    border: none;
  }
}
</style>
