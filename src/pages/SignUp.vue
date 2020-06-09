<template>
  <q-page padding>
    <app-header :reveal="true">
      <template #right>
        <q-btn
          class="text-capitalize"
          to="/e/sign-in"
          flat
          dense
          label="Login"
          icon-right="keyboard_arrow_right"
        />
      </template>
    </app-header>

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
        :contracted="$q.screen.width < 375"
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
            v-model.trim="form.fullName"
            lazy-rules
            label="Full name"
            autofocus
            :rules="[rules.required, ...rules.name]"
          />
          <q-input
            v-model.trim="form.email"
            lazy-rules
            type="email"
            label="Email"
            @keyup.enter="nextStep"
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
          <q-select
            v-model="form.university"
            :options="universities.map(e => ({ id: e._id, label: e.name }))"
            label="University"
            :rules="[rules.required]"
            behavior="dialog"
            :loading="loading"
            :disable="loading"
          />
          <q-select
            v-model="form.faculty"
            :options="faculties"
            label="Faculty"
            :rules="[rules.required]"
            behavior="dialog"
            :loading="loading"
            :disable="loading || !faculties.length"
          />
          <q-select
            v-if="form.userRole === 'student'"
            v-model="form.specialty"
            :options="specialties"
            label="Specialty"
            :rules="[rules.required]"
            behavior="dialog"
            :loading="loading"
            :disable="loading || !specialties.length"
          />
          <q-select
            v-if="form.userRole === 'student'"
            v-model="form.group"
            :options="groups"
            label="Group"
            :rules="[rules.required]"
            :loading="loading"
            :disable="loading || !groups.length"
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
            v-if="form.userRole === 'teacher'"
            v-model.trim="form.teacherUID"
            lazy-rules
            type="text"
            label="Teacher uid"
            hint="Unique id to confirm the status of a teacher"
            readonly
          >
            <template #append>
              <q-icon @click="copyUID" size="20px" name="fas fa-clone" />
            </template>
          </q-input>
          <q-input
            v-model.trim="form.password"
            lazy-rules
            type="password"
            label="Password"
            hint="Fill in between 6 and 12 characters"
            :rules="[rules.required, ...rules.password]"
          />
          <q-input
            v-model.trim="confirmPassword"
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
import { mapActions } from 'vuex'
import { uid, copyToClipboard } from 'quasar'

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
      loading: false,
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
        userRole: 'student',
        teacherUID: uid(),
        university: null,
        faculty: null,
        group: null,
        specialty: null
      },
      rules: {
        required: val => !!val || 'Field is required',
        name: [
          val => (val.length > 1) || 'Too short'
        ],
        password: [
          val => (val.length > 5 && val.length < 13) || 'Fill in between 6 and 12 characters'
        ]
      },
      universities: [],
      faculties: [],
      specialties: [],
      groups: []
    }
  },

  watch: {
    'form.university.id'(newId) {
      this.faculties = []
      this.specialties = []
      this.form.faculty = null
      this.form.specialty = null

      const u = this.universities.find(e => e._id === newId)
      this.faculties = u ? u.faculties.map(e => ({ id: e._id, label: e.name })) : []
    },
    'form.faculty.id'(newId) {
      this.specialties = []
      this.form.specialty = null

      const u = this.universities.find(e => e._id === this.form.university.id)
      const f = u.faculties.find(e => e._id === newId)
      this.specialties = f ? f.specialties.map(e => ({ id: e._id, label: e.name })) : []
    },
    'form.specialty.id'(newId) {
      this.groups = []
      this.form.group = null

      const u = this.universities.find(e => e._id === this.form.university.id)
      const f = u.faculties.find(e => e._id === this.form.faculty.id)
      const s = f.specialties.find(e => e._id === newId)
      this.groups = s ? s.groups.map(e => ({ id: e._id, label: e.number })) : []
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      this.loading = true
      this.universities = await this._getUniversities()
      this.loading = false
    },

    async onSubmit(val) {
      const isStudent = this.form.userRole === 'student'
      const params = {
        universityId: this.form.university.id,
        faculty: {
          id: this.form.faculty.id,
          name: this.form.faculty.label
        },
        specialty: isStudent ? {
          id: this.form.specialty.id,
          name: this.form.specialty.label
        } : null,
        group: isStudent ? {
          id: this.form.group.id,
          number: this.form.group.label
        } : null,
        name: this.form.fullName,
        email: this.form.email,
        userRole: this.form.userRole,
        teacherUID: !isStudent ? this.form.teacherUID : null,
        password: this.form.password
      }

      this.$q.loading.show()
      try {
        await this._signUp(params)
      } finally {
        this.$q.loading.hide()
      }
    },

    passwordsAreEqual(val) {
      return this.form.password === val || 'Passwords mismatch'
    },

    async nextStep() {
      this.formValid = await this.$refs.signUpForm.validate()
      if (!this.formValid) return
      this.$refs.stepper.next()
    },

    isValidEmail(val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },

    copyUID() {
      copyToClipboard(this.form.teacherUID)
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
  }
}
</script>
