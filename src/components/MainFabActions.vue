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
        v-if="me.userRole === 'teacher'"
        @click="broadcast"
        color="primary"
        label="broadcast"
        label-position="left"
      />
    </q-fab>
  </q-page-sticky>
</template>

<script>
import { mapGetters } from 'vuex'
import BroadcastModal from 'components/modals/BroadcastModal'

export default {
  name: 'MainFabActions',

  data() {
    return {
      fabPos: [18, 18]
    }
  },

  computed: {
    broadcastList() {
      const s = this.specialties.map(el => ({
        label: el.name,
        id: el._id
      }))

      return [{}, ...s]
    },

    ...mapGetters('user', ['me', 'specialties', 'groups'])
  },

  methods: {
    broadcast() {
      this.$q.bottomSheet({
        message: 'Select recipients:',
        grid: false,
        class: 'broadcast-sheet',
        style: 'width: 90% !important;',
        actions: this.broadcastList
      }).onOk(action => {
        this.handleBroadcast(action.id)
      }).onCancel(() => {
        console.log('Dismissed')
      }).onDismiss(() => {
        console.log('I am triggered on both OK and Cancel')
      })
    },

    handleBroadcast(id) {
      this.$q.dialog({
        component: BroadcastModal,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this, // becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'something',
        id
      }).onOk(() => {
        console.log('OK')
      }).onCancel(() => {
        console.log('Cancel')
      }).onDismiss(() => {
        console.log('Called on OK or Cancel')
      })
    }
  }
}
</script>

<style lang="scss">
.broadcast-sheet {
  .q-item__section--avatar {
    display: none;
  }
}
</style>
