<template>
  <q-header
    class="bg-primary text-white text-capitalize"
    height-hint="98"
    reveal
  >
    <q-toolbar>
      <slot name="left" />
      <q-toolbar-title v-if="title">{{ title }}</q-toolbar-title>
      <slot name="right" />
    </q-toolbar>

    <slot name="bottom" />
  </q-header>
</template>

<script>
export default {
  name: 'AppHeader',

  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>
