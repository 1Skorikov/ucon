<template>
  <q-page padding>
    <app-header :title="$t('registration')" />

    <q-form
      @submit.prevent="onSubmit"
      ref="signUpForm"
      class="q-gutter-md q-pa-sm"
    >
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        header-nav
        animated
        keep-alive
        contracted
        alternative-labels
      >
        <q-step
          :name="1"
          title="User"
          icon="far fa-address-card"
          :error="step === 1 && !formValid"
          :done="step > 1"
          :header-nav="step > 1"
        >
          <q-input
            v-model="form.fullName"
            lazy-rules
            label="Full name"
            autofocus
            :rules="[rules.required, ...rules.name]"
          />
          <q-input
            v-model="form.email"
            lazy-rules
            type="email"
            label="Email"
            :rules="[rules.required, isValidEmail]"
          />
          <q-option-group
            v-model="form.userRole"
            :options="options"
            color="primary"
            class="q-mt-md"
            inline
            dense
            :rules="[rules.required]"
          />
        </q-step>

        <q-step
          :name="2"
          title="University"
          icon="fas fa-graduation-cap"
          :error="step === 2 && !formValid"
          :done="step > 2"
          :header-nav="step > 2"
        >
          <q-input
            v-model="form.university.name"
            lazy-rules
            label="University"
            :rules="[rules.required]"
          />
          <q-input
            v-model="form.university.faculty"
            lazy-rules
            label="Faculty"
            :rules="[rules.required]"
          />
          <q-input
            v-if="form.userRole === 'student'"
            v-model="form.university.specialization"
            lazy-rules
            label="Specialization"
            :rules="[rules.required]"
          />
          <q-input
            v-if="form.userRole === 'student'"
            v-model="form.university.groupNumber"
            lazy-rules
            type="number"
            label="Number of group"
            :rules="[rules.required, ...rules.groupNumber]"
          />
        </q-step>

        <q-step
          :name="3"
          title="Profile"
          icon="far fa-user-circle"
          :error="step === 3 && !formValid"
          :header-nav="step > 3"
        >
          <q-input
            v-model="form.nickname"
            lazy-rules
            type="text"
            label="Nickname"
            :rules="[rules.required]"
          />
          <q-input
            v-model="form.password"
            lazy-rules
            type="password"
            label="Password"
            hint="Fill in between 6 and 12 characters"
            :rules="[rules.required, ...rules.password]"
          />
          <q-input
            v-model="confirmPassword"
            lazy-rules
            type="password"
            label="Repeat password"
            :rules="[rules.required, passwordsAreEqual]"
          />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              v-if="step === 3"
              label="Finish"
              type="submit"
              color="primary"
              key="submit"
              :disabled="!formValid"
            />
            <q-btn
              v-else
              @click="nextStep"
              color="primary"
              label="Continue"
              key="next"
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              key="prev"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'SignUp',

  components: {
    AppHeader: () => import('components/global/AppHeader')
  },

  data() {
    return {
      step: 1,
      confirmPassword: null,
      formValid: true,
      options: [
        {
          label: 'I am a student',
          value: 'student'
        },
        {
          label: 'I am a teacher',
          value: 'teacher'
        }
      ],
      form: {
        fullName: null,
        email: null,
        password: null,
        nickname: null,
        userRole: 'student',
        university: {
          name: null,
          faculty: null,
          groupNumber: null,
          specialization: null
        }
      },
      rules: {
        required: val => !!val || 'Field is required',
        groupNumber: [
          val => (val > 0 && val < 1000000) || 'Please type a real number'
        ],
        name: [
          val => (val.length > 1) || 'Too short'
        ],
        password: [
          val => (val.length > 5 && val.length < 13) || 'Fill in between 6 and 12 characters'
        ]
      }
    }
  },

  methods: {
    onSubmit(val) {
      console.log('onSubmit', this.form)

      this.$q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted'
      })

      this.$router.push({
        name: 'Chats'
      })
    },

    passwordsAreEqual(val) {
      return this.form.password === val || 'Password mismatch'
    },

    async nextStep() {
      this.formValid = await this.$refs.signUpForm.validate()
      if (!this.formValid) return
      this.$refs.stepper.next()
    },

    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    }
  }
}
</script>
