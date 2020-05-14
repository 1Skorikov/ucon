<template>
  <q-header class="bg-primary text-white" height-hint="98" reveal>
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="$emit('toolbarClick')" />
      <q-toolbar-title>{{ $t("utils.name") }}</q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
