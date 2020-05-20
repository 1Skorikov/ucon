const app = require('express')(),
  http = require('http').createServer(app),
  path = require('path'),
  port = 3000,
  io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.template.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(port, () => console.log(`listening on *:${port}`))

module.exports = http
