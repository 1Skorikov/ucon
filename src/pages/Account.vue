<template>
  <q-page padding>
    <q-form
      @submit.prevent="onSubmit"
      ref="signUpForm"
      class="q-gutter-md q-pa-sm"
    >
      <q-input :value="user.fullName" label="Full name" readonly />
      <q-input :value="user.email" type="email" label="Email" readonly />
      <q-input :value="user.university.name" label="University" readonly />
      <q-input :value="user.faculty.name" label="Faculty" readonly />
      <q-input
        v-if="user.userRole === 'student'"
        :value="user.specialty.name"
        label="Specialty"
        readonly
      />
      <q-input
        v-if="user.userRole === 'student'"
        :value="user.group.number"
        label="Number of group"
        readonly
      />
      <q-input
        v-if="user.userRole === 'teacher'"
        :value="user.teacherUID"
        type="text"
        label="Teacher uid"
        hint="Unique id to confirm the status of a teacher"
        readonly
      >
        <template #append>
          <q-icon @click="copyUID" size="20px" name="fas fa-clone" />
        </template>
      </q-input>
    </q-form>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { copyToClipboard } from 'quasar'

export default {
  name: 'Account',

  methods: {
    onSubmit() { },
    copyUID() {
      copyToClipboard(this.user.teacherUID)
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'ID copied'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'Something went wrong'
          })
        })
    }
  },

  computed: {
    ...mapState('user', ['user'])
  }
}
</script>
