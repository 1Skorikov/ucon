<template>
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
      <!-- <q-badge color="red" floating>2</q-badge> -->
    </q-tab>
  </q-tabs>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChatsListTabs',

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

<style>
</style>
