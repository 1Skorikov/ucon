<template>
  <q-page class="chat-page row justify-center">
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
      <div v-for="(item, i) in 20" :key="i">
        <q-chat-message
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
        />
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { scroll } from 'quasar'

export default {
  name: 'Chat',

  data() {
    return {
      position: 300
    }
  },

  mounted() {
    this.setScrollPosition()
  },

  methods: {
    setScrollPosition() {
      const scrollTarget = this.$refs.scrollArea.getScrollTarget()
      this.$refs.scrollArea.setScrollPosition(scrollTarget.scrollHeight)
      this.position = Math.floor(Math.random() * 1001) * 20
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-page {
  // background-color: $bg-color;
  background-color: #f6f8fa;
}
</style>
