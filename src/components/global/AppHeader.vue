<template>
  <q-header
    class="bg-primary text-white text-capitalize"
    height-hint="98"
    :reveal="reveal"
  >
    <q-toolbar>
      <slot name="left" />
      <q-toolbar-title>
        {{ headerTitle }}
      </q-toolbar-title>
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
    },
    reveal: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    headerTitle() {
      return this.title || this.$route.meta.navbarTitle || this.$route.name
    }
  }
}
</script>
