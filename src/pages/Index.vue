<template>
  <q-page
    v-touch-swipe.mouse.right.left="handleSwipe"
    style="padding-top: 46px;"
  >
    <q-pull-to-refresh @refresh="refresh">
      <chats-list></chats-list>
    </q-pull-to-refresh>

    <q-page-sticky expand position="top">
      <q-tabs
        v-model="activeTabName"
        dense
        align="justify"
        class="full-width text-white bg-primary"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab.id"
          :name="tab.name"
          :label="tab.label"
        >
          <q-badge color="red" floating>2</q-badge>
        </q-tab>
      </q-tabs>
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
import { mapState } from 'vuex'

export default {
  name: 'PageIndex',

  components: {
    ChatsList: () => import('components/ChatsList')
  },

  data() {
    return {
      fab: false,
      fabPos: [18, 18]
    }
  },

  created() {
  },

  computed: {
    activeTabName: {
      get() {
        return this.$store.state.ui.activeChatsList
      },
      set(val) {
        this.$store.commit('ui/updateActiveChatsList', val)
      }
    },

    activeTab() {
      return this.tabs.find(e => e.name === this.activeTabName)
    },

    tabs() {
      if (this.user.userRole === 'student') {
        return [
          {
            id: 0,
            name: 'all',
            label: this.$tc('utils.all')
          },
          {
            id: 1,
            name: 'group',
            label: this.user.group.number
          },
          {
            id: 2,
            name: 'student',
            label: this.$tc('student', 2)
          },
          {
            id: 3,
            name: 'teacher',
            label: this.$tc('teacher', 2)
          }
        ]
      }

      if (this.user.userRole === 'teacher') {
        return [
          {
            id: 0,
            name: 'all',
            label: this.$tc('utils.all')
          },
          {
            id: 1,
            name: 'student',
            label: this.$tc('student', 2)
          },
          {
            id: 2,
            name: 'teacher',
            label: this.$tc('teacher', 2)
          }
        ]
      }

      return []
    },

    ...mapState('user', ['user'])
  },

  methods: {
    async refresh(done) {
      await this.$store.dispatch('chats/getUserChats')
      done()
    },

    handleSwipe({ evt, ...info }) {
      const nextTab = this.tabs[info.direction === 'left' ? this.activeTab.id + 1 : this.activeTab.id - 1]

      if (nextTab) {
        this.$store.commit('ui/updateActiveChatsList', nextTab.name)
      } else if (info.direction === 'right') {
        this.$store.commit('ui/toggleDrawerState')
      }
    },

    broadcast() {
      console.log('broadcast message')
    }
  }
}
</script>
