<template>
  <q-page
    v-touch-swipe.mouse.right.left="handleSwipe"
    style="padding-top: 46px;"
  >
    <q-pull-to-refresh @refresh="refresh">
      <chats-list></chats-list>
    </q-pull-to-refresh>

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="300"
      :offset="[18, 18]"
    >
      <q-btn fab-mini icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>

    <q-page-sticky expand position="top">
      <q-tabs
        v-model="activeTabName"
        dense
        align="justify"
        class="full-width text-white bg-primary shadow-2"
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
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  components: {
    ChatsList: () => import('components/ChatsList')
  },

  data() {
    return {
      tabs: [
        {
          id: 0,
          name: 'all',
          label: this.$tc('utils.all')
        },
        {
          id: 1,
          name: 'group',
          label: 408
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
    }
  },

  sockets: {
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
    }
  }
}
</script>
