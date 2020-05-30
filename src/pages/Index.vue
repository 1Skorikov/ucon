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

    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-fab icon="add" direction="left" color="accent">
        <q-fab-action
          :to="{ name: 'RecipientSelector' }"
          color="primary"
          label="chat"
          label-position="left"
        />
        <q-fab-action
          v-if="user.userRole === 'teacher'"
          @click="broadcast"
          color="primary"
          label="broadcast"
          label-position="left"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',

  components: {
    ChatsList: () => import('components/ChatsList'),
    ChatsListTabs: () => import('components/ChatsListTabs')
  },

  data() {
    return {
      fab: false,
      fabPos: [18, 18]
    }
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
      await this.$store.dispatch('chats/getUserChats')
      done()
    },

    handleSwipe({ evt, ...info }) {
      if (!this.allChats.length) return
      this.$refs.tabs.handleSwipe({ evt, ...info })
    },

    broadcast() {
      console.log('broadcast message')
    }
  }
}
</script>
