import { Notify } from 'quasar'

function notify(type, message) {
  Notify.create({
    type,
    message
  })
}

export default {
  computed: {
    _me() {
      return this.$store.state.user.user
    }
  },

  methods: {
    _login(form) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('user:sign-in', form, (err, res) => {
          if (err) {
            notify('negative', res)
            return reject(res)
          }

          this.$q.localStorage.set('userLoggedIn', true)
          this.$q.localStorage.set('userId', res._id)
          resolve(res)
        })
      })
    },

    _logout() {
      this.$q.localStorage.set('userLoggedIn', false)
      this.$q.localStorage.set('userId', '')
      this.$store.commit('chats/initChats', [])
      this.$router.push({ name: 'SignIn' })
    },

    _signUp(form) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('user:sign-up', form, (err, res) => {
          if (err) {
            notify('negative', res)
            return reject(res)
          }

          this.$q.localStorage.set('userLoggedIn', true)
          this.$q.localStorage.set('userId', res._id)
          this.$router.push({ name: 'Chats' })
          resolve(res)
        })
      })
    },

    _getUser(id) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('get:user', id, (err, res) => {
          if (err) {
            notify('negative', err)
            this.$router.push({ name: 'SignIn' })
            this.$q.localStorage.set('userId', '')
            this.$q.localStorage.set('userLoggedIn', false)
            return reject(err)
          }

          resolve(res)
        })
      })
    },

    _getUniversities() {
      return new Promise((resolve, reject) => {
        this.$socket.emit('get:universities', (err, data) => {
          if (err) {
            notify('negative', err)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    _searchRecipient(query) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('search:recipient', query, (err, data) => {
          if (err) {
            notify('negative', err)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    _searchRecipientByGroup(id) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('search:recipientByGroup', id, (err, data) => {
          if (err) {
            notify('negative', data)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    _searchRecipientByFaculty(id) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('search:recipientByFaculty', id, (err, data) => {
          if (err) {
            notify('negative', data)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    _newRoom(params) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('new:room', params, (err, data) => {
          if (err) {
            notify('negative', data)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    _getChats(userId) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('get:chats', userId, (err, data) => {
          if (err) {
            notify('negative', data)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    _sendMessage({ text, roomId, groups }) {
      return new Promise((resolve, reject) => {
        const params = {
          text,
          roomId,
          groups,
          userId: this._me._id
        }

        this.$socket.emit('new:message', params, (err, data) => {
          if (err) {
            notify('negative', data)
            return reject(data)
          }

          resolve(data)
        })
      })
    },

    // _broadcastMessage({  }) {
    //   return new Promise((resolve, reject) => {
    //     const params = {
    //       text,
    //       roomId,
    //       userId: this._me._id
    //     }

    //     this.$socket.emit('new:message', params, (err, data) => {
    //       if (err) {
    //         notify('negative', data)
    //         return reject(data)
    //       }

    //       resolve(data)
    //     })
    //   })
    // },

    _getMessages(roomId) {
      return new Promise((resolve, reject) => {
        this.$socket.emit('get:messages', roomId, (err, data) => {
          if (err) {
            notify('negative', data)
            return reject(data)
          }

          this.$store.commit('messages/initMessages', data)
          resolve(data)
        })
      })
    }
  }
}
