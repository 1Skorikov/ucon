<template>
  <q-layout view="lHh lpR lFf">
    <app-header @toolbarClick="$refs.sidebar.toggleDrawer()" />

    <app-sidebar ref="sidebar" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {
    AppHeader: () => import('components/global/AppHeader'),
    AppSidebar: () => import('components/global/AppSidebar')
  }
}
</script>
