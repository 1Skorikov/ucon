<template>
  <q-header
    elevated
    class="bg-primary text-white"
    height-hint="98"
  >
    <q-toolbar>
      <q-btn
        dense
        flat
        round
        icon="menu"
        @click="$emit('toolbarClick')"
      />

      <q-toolbar-title>{{ $t('utils.name') }}</q-toolbar-title>
    </q-toolbar>

    <q-tabs align="center">
      <q-route-tab
        to="/page1"
        :label="$tc('utils.all')"
      />
      <q-route-tab
        to="/page2"
        label="408"
      />
      <q-route-tab
        to="/page3"
        :label="$tc('student', 2)"
      />
      <q-route-tab
        to="/page3"
        :label="$tc('teacher', 2)"
      />
    </q-tabs>
  </q-header>
</template>

<script>
export default {
  name: 'AppHeader',

  data() {
    return {
    }
  }
}
</script>
