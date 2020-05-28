<template>
  <q-layout view="lHh lpR lFf">
    <app-header :reveal="true">
      <template #left>
        <q-btn
          v-if="$route.name === 'Chats'"
          dense
          flat
          round
          icon="menu"
          @click="toggleDrawerState"
        />
        <q-btn
          v-else
          dense
          flat
          round
          icon="arrow_back_ios"
          @click="$router.back()"
        />
      </template>
    </app-header>

    <app-sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {
    AppHeader: () => import('components/global/AppHeader'),
    AppSidebar: () => import('components/global/AppSidebar')
  },

  methods: {
    toggleDrawerState() {
      this.$store.commit('ui/toggleDrawerState')
    }
  }
}
</script>
