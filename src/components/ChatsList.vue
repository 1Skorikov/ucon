<template>
  <q-list>
    <q-item
      v-for="chat in userChats(activeChatsList)"
      :key="chat.id"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-avatar size="48px" class="shadow-1">
          <span>{{ chat.user.fullName.charAt(0) }}</span>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-bold" lines="1">
          {{ chat.user.fullName }}
        </q-item-label>

        <q-item-label caption>
          {{ chat.lastMessage.text }}
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label>
          {{ chat.lastMessage.time }}
        </q-item-label>

        <q-item-label v-if="chat.unreadCount">
          <q-badge color="secondary">{{ chat.unreadCount }}</q-badge>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ChatsList',

  computed: {
    ...mapGetters('chats', ['userChats']),
    ...mapState('ui', ['activeChatsList'])
  }
}
</script>
