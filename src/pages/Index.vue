<template>
  <q-page
    v-touch-swipe.mouse.right.left="handleSwipe"
    style="padding-top: 46px;"
  >
    <q-pull-to-refresh @refresh="refresh">
      <chats-list />
    </q-pull-to-refresh>

    <q-page-sticky v-if="allChats.length" expand position="top">
      <chats-list-tabs ref="tabs" />
    </q-page-sticky>

    <main-fab-actions />
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',

  components: {
    ChatsList: () => import('components/chat/ChatsList'),
    ChatsListTabs: () => import('components/chat/ChatsListTabs'),
    MainFabActions: () => import('components/MainFabActions')
  },

  computed: {
    allChats() {
      return this.userChats('all')
    },

    ...mapState('user', ['user']),
    ...mapGetters('chats', ['userChats'])
  },

  methods: {
    async refresh(done) {
      console.log('REFRESH CHATS')
      done()
    },

    handleSwipe({ evt, ...info }) {
      if (!this.allChats.length) return
      this.$refs.tabs.handleSwipe({ evt, ...info })
    }
  }
}
</script>
