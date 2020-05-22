import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import store from '../store'

const io = new VueSocketIO({
  debug: false,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SA_',
    mutationPrefix: 'SM_'
  }
})

Vue.use(io)

// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async function({ app, router, Vue }) {
//   // something to do
// }
