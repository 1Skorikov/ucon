<template>
  <q-page padding>
    <q-form
      @submit.prevent="onSubmit"
      ref="signUpForm"
      class="q-gutter-md q-pa-sm"
    >
      <!-- <q-input lazy-rules label="Full name" />
      <q-input lazy-rules type="email" label="Email" />
      <q-option-group
        :options="options"
        color="primary"
        class="q-mt-md"
        inline
        dense
      /> -->

      <!-- ОТПРАВЛЯТЬ НА КЛИЕНТ В ОБЬЕКТЕ ЮЗЕРА ИНФУ О УНИВЕРЕ И ФАКУЛЬТЕТЕ ИЛИ СТОРЫ ДЛЯ ЭТО ОТДЕЛЬНЫЕ -->

      <!-- <q-select
        :options="universities.map(e => ({ id: e._id, label: e.name }))"
        label="University"
        :rules="[rules.required]"
        behavior="dialog"
        :loading="loading"
        :disable="loading"
      />
      <q-select
        :options="faculties"
        label="Faculty"
        :rules="[rules.required]"
        behavior="dialog"
        :loading="loading"
        :disable="loading || !faculties.length"
      />
      <q-select
        v-if="form.userRole === 'student'"
        :options="specialties"
        label="Specialty"
        :rules="[rules.required]"
        behavior="dialog"
        :loading="loading"
        :disable="loading || !specialties.length"
      />
      <q-input
        v-if="form.userRole === 'student'"
        lazy-rules
        type="number"
        label="Number of group"
      />

      <q-input
        v-if="form.userRole === 'teacher'"
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
        lazy-rules
        type="password"
        label="Password"
        hint="Fill in between 6 and 12 characters"
      />
      <q-input lazy-rules type="password" label="Repeat password" /> -->
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'Account',

  methods: {
    onSubmit() { }
  }
}
</script>
