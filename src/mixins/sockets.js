import { Notify } from 'quasar'

function notify(type, message) {
  Notify.create({
    type,
    message
  })
}

export default {
  sockets: {

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
          this.$router.push({ name: 'Chats' })
          resolve(res)
        })
      })
    },

    _logout() {
      this.$q.localStorage.set('userLoggedIn', false)
      this.$q.localStorage.set('userId', '')
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
    }
  }
}
