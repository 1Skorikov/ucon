<template>
  <q-page padding>
    <app-header :reveal="true">
      <template #right>
        <q-btn
          to="/e/sign-up"
          flat
          dense
          label="Sign up"
          class="text-capitalize"
          icon-right="keyboard_arrow_right"
        />
      </template>
    </app-header>

    <q-form @submit.prevent="onSubmit" class="q-gutter-md q-pa-sm">
      <q-input
        v-model.trim="form.email"
        lazy-rules
        type="email"
        label="Email"
        :rules="[rules.required, isValidEmail]"
      />
      <q-input
        v-model.trim="form.password"
        type="password"
        lazy-rules
        label="Password"
        :rules="[rules.required]"
      />
      <q-btn label="login" type="submit" color="primary" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'SignIn',

  components: {
    AppHeader: () => import('components/global/AppHeader')
  },

  data() {
    return {
      form: {
        email: null,
        password: null
      },
      rules: {
        required: val => !!val || 'Field is required'
      }
    }
  },

  methods: {
    async onSubmit() {
      this.$q.loading.show()
      try {
        await this._login(this.form)
        await this.fetchUser()
        await this.fetchChats()
      } catch (err) {
        console.error(err)
      }
      this.$q.loading.hide()
      this.$router.push({ name: 'Chats' })
    },

    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },

    async fetchUser() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        await this._getUser(userId)
      } catch (err) {
        console.error(err)
      }
    },

    async fetchChats() {
      const userId = this.$q.localStorage.getItem('userId')
      if (!userId) return this.$q.loading.hide()

      try {
        const chats = await this._getChats(userId)
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
