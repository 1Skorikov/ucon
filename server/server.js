const app = require('express')(),
  http = require('http').createServer(app),
  path = require('path'),
  port = process.env.PORT || 3000,
  io = require('socket.io')(http)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../src/index.template.html')))

require('./sockets')(io)

http.listen(port, () => console.log(`listening on *:${port}`))

module.exports = http
