<template>
  <q-layout view="hHh Lpr fFf">
    <app-header title="test title" :reveal="false">
      <template #left>
        <q-btn dense flat round icon="arrow_back_ios" @click="$router.back()" />
      </template>
    </app-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Chat',

  components: {
    AppHeader: () => import('components/global/AppHeader')
  },

  data() {
    return {
      leftDrawer: true
    }
  }
}
</script>
