<template>
  <q-page style="padding-top: 50px;">
    <q-list v-if="[...students, ...teachers].length && !loading" key="list">
      <template v-if="teachers.length">
        <q-separator />
        <q-item-label header>Teachers</q-item-label>
      </template>

      <q-item
        v-for="user in teachers"
        :key="user._id"
        class="q-mb-sm"
        clickable
        v-ripple
        @click="createRoom(user)"
      >
        <q-item-section avatar>
          <q-avatar class="shadow-1">
            <!-- <img :src="`https://cdn.quasar.dev/img/${user.avatar}`" /> -->
            {{ user.fullName.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.fullName }}</q-item-label>
          <q-item-label caption lines="1">{{ user.faculty.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="secondary" />
        </q-item-section>
      </q-item>

      <q-item-label v-if="students.length" header>Students</q-item-label>

      <q-item
        v-for="user in students"
        :key="user._id"
        class="q-my-sm"
        clickable
        v-ripple
        @click="createRoom(user)"
      >
        <q-item-section avatar>
          <q-avatar class="shadow-1" color="primary" text-color="white">
            {{ user.fullName.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.fullName }}</q-item-label>
          <q-item-label caption lines="1">
            {{ `${user.specialty.name}, ${user.group.number} group` }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="secondary" />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-else class="users-list--empty" key="list-empty">
      <q-img
        style="width: 90%;"
        src="statics/backgrounds/empty-list.png"
        spinner-color="white"
        class="text-center"
      />
      <h3 class="text-subtitle1 text-center">
        We did not find any users
      </h3>
    </div>

    <q-page-sticky expand position="top">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-input
          dark
          dense
          standout
          v-model="search"
          debounce="700"
          style="width: 100%;"
          :loading="loading"
          placeholder="Search by user or group name"
        >
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RecipientSelector',

  data() {
    return {
      search: '',
      loading: false,
      searchResults: []
    }
  },

  computed: {
    students() {
      return this.searchResults.filter(e => e.userRole === 'student' && e._id !== this.me._id)
    },
    teachers() {
      return this.searchResults.filter(e => e.userRole === 'teacher' && e._id !== this.me._id)
    },
    ...mapGetters('user', ['me'])
  },

  watch: {
    async search(query) {
      if (!query) {
        return this.fetchDefaultRecipients()
      }

      this.loading = true
      try {
        this.searchResults = await this._searchRecipient(query)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  },

  mounted() {
    this.fetchDefaultRecipients()
  },

  methods: {
    async fetchDefaultRecipients() {
      this.loading = true
      try {
        if (this.me.userRole === 'student') {
          this.searchResults = await this._searchRecipientByGroup(this.me.group.id)
        } else {
          this.searchResults = await this._searchRecipientByFaculty(this.me.faculty.id)
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async createRoom(user) {
      this.$q.loading.show()

      try {
        await this._newRoom({
          type: 'private',
          me: this.me._id,
          interlocutor: user._id,
          users: [this.me._id, user._id]
        })
      } catch (err) {
        console.error(err)
      }

      this.$q.loading.hide()
      this.$router.push({ name: 'Chat' })
    }
  }
}
</script>

<style lang="scss">
.users-list--empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 20px;
}
</style>
