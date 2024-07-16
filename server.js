// create node http server (may use express instead)
const http = require('http').createServer()
const PORT = 5501

// import socket.io
// pass in http server as an argument
// handle CORS to access BE from FE app,
const io = require('socket.io')(http, {
  cors: { origin: '*' },
})

// listen for event & use callback to access socket obj
io.on('connection', (socket) => {
  const socketId = socket.id
  const userId = socketId.substr(0, 2)
  console.log(`a user connected: ${userId}`)

  // inform front end of unique connection id
  socket.emit('socketInit', socketId)

  // get edited text from client
  socket.on('text-edit', (text) => {
    io.emit('text-edit', {
      text: text,
      socketId: socketId,
    })
  })
})

// listen on specified port
http.listen(PORT, () => {
  console.log(`listening on localhost: ${PORT}`)
})

