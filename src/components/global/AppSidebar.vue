<template>
  <q-drawer
    side="left"
    overlay
    behavior="mobile"
    ref="drawer"
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>{{ $t('logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <q-img
      class="absolute-top"
      :src="userInfo.sidebarBgc"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar
          size="56px"
          class="q-mb-sm"
        >
          <img :src="userInfo.photoUrl">
        </q-avatar>
        <div class="text-weight-bold">{{ userInfo.name }}</div>
        <div>{{ `@${userInfo.nickname}` }}</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script>
export default {
  name: 'AppSidebar',

  data: () => ({
    userInfo: {
      sidebarBgc: 'statics/bgc/sidebar-background.jpg',
      photoUrl: 'https://cdn.quasar.dev/img/boy-avatar.png',
      name: 'Ivan Skorikov',
      nickname: 'gagaledi'
    }
  }),

  methods: {
    toggleDrawer() {
      this.$refs.drawer.toggle()
    }
  }
}
</script>
