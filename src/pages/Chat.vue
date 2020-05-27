<template>
  <q-page padding class="q-pa-md row justify-center bgColor">
    <div v-for="(item, i) in 20" :key="i">
      <q-chat-message
        name="Ivan"
        name-sanitize
        :text="['hey, how are you?']"
        text-sanitize
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        name-sanitize
        :text="[
          'doing fine, how r you?',
          'I just feel like typing a really, really, <strong>REALY</strong> long message to annoy you...'
        ]"
        text-sanitize
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        size="6"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Chat'
}
</script>
