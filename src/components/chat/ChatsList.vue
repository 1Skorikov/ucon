<template>
  <q-list>
    <chats-list-item v-for="chat in chats" :key="chat.id" :chat="chat" />

    <div v-if="!chats.length" class="chats-list--empty">
      <q-img
        basic
        style="width: 80%; max-width: 500px;"
        src="statics/backgrounds/no-messages.png"
        spinner-color="white"
        class="text-center"
      />
      <h3 class="text-subtitle2 text-grey text-center">No chats yet ...</h3>
    </div>
  </q-list>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ChatsList',

  components: {
    ChatsListItem: () => import('components/chat/ChatsListItem')
  },

  computed: {
    chats() {
      return this.userChats(this.activeChatsList)
    },

    ...mapGetters('chats', ['userChats']),
    ...mapState('ui', ['activeChatsList'])
  }
}
</script>

<style lang="scss">
.chats-list--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
