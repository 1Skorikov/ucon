<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          v-model="message"
          autogrow
          class="col-grow q-mr-sm"
          input-class="chat-input"
          bg-color="white"
          placeholder="Type a message"
          ref="messageInput"
          @keydown.enter.ctrl="onOKClick"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" label="Send" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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

  computed: {
    groups() {
      const spec = this.specialties.find(el => el._id === this.id)
      return spec ? spec.groups : null
    },

    ...mapGetters('user', ['specialties'])
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      this.sendMessage()
      this.$emit('ok')
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },

    async sendMessage() {
      if (!this.message) return

      await this._sendMessage({
        text: this.message,
        groups: this.groups
      })

      this.message = ''
    }
  }
}
</script>
