<template>
  <q-page padding>
    <app-header :title="$t('login')">
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

    <q-form @submit="onSubmit" class="q-gutter-md q-pa-sm">
      <q-input
        v-model.trim="form.email"
        lazy-rules
        type="email"
        label="Email"
        :rules="[rules.required]"
      />
      <q-input
        v-model.trim="form.password"
        type="password"
        lazy-rules
        label="Full name"
        autofocus
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
    onSubmit() {

    }
  }
}
</script>
