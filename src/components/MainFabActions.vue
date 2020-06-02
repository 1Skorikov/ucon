<template>
  <q-page-sticky position="bottom-right" :offset="fabPos">
    <q-fab icon="add" direction="left" color="accent">
      <q-fab-action
        :to="{ name: 'RecipientSelector' }"
        color="primary"
        label="chat"
        label-position="left"
      />
      <q-fab-action
        v-if="user.userRole === 'teacher'"
        @click="broadcast"
        color="primary"
        label="broadcast"
        label-position="left"
      />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainFabActions',

  data() {
    return {
      fabPos: [18, 18]
    }
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    broadcast() {
      console.log('broadcast message')
    }
  }
}
</script>
