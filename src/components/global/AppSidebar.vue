<template>
  <q-drawer
    v-model="drawerStatus"
    side="left"
    overlay
    behavior="mobile"
    ref="drawer"
  >
    <q-scroll-area
      style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
    >
      <q-list padding>
        <q-item clickable v-ripple :to="{ name: 'Chats' }">
          <q-item-section avatar>
            <q-icon name="inbox" />
          </q-item-section>

          <q-item-section>Chats</q-item-section>
        </q-item>
        <q-item clickable v-ripple :to="{ name: 'Account' }">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>

          <q-item-section>Account</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="_logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section class="text-capitalize">
            {{ $t("logout") }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      :src="userInfo.sidebarBgc"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img :src="userInfo.photoUrl" />
        </q-avatar>
        <div class="text-weight-bold">{{ me.fullName }}</div>
        <div>{{ me.email }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AppSidebar',

  data: () => ({
    userInfo: {
      sidebarBgc: 'statics/backgrounds/sidebar-background.jpg',
      photoUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
      name: 'Ivan Skorikov',
      nickname: 'gagaledi'
    }
  }),

  computed: {
    drawerStatus: {
      get() {
        return this.drawerState
      },
      set() {
        this.$store.commit('ui/toggleDrawerState')
      }
    },

    ...mapState('ui', ['drawerState']),
    ...mapGetters('user', ['me'])
  }
}
</script>
