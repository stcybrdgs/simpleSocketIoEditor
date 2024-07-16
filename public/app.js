const socket = io('ws://localhost:5501')
let socketId = ''

socket.on('socketInit', (id) => {
  socketId = id
})

const editBtn = document.querySelector('.edit-btn')
const editArea = document.querySelector('.edit-area')
const editText = document.querySelector('.edit-textbox')
const previewBtn = document.querySelector('.preview-btn')
const previewArea = document.querySelector('.preview-area')
const previewText = document.querySelector('.preview-textbox')
const whoIsTyping = document.querySelector('.who-is-typing')

function updatePreviewText(text) {
  previewText.textContent = text
}

function updateEditText(text) {
  editText.value = text
}

// Get edited text from server
socket.on('text-edit', (editInfo) => {
  updatePreviewText(editInfo.text)
  whoIsTyping.textContent = `${editInfo.socketId} is typing...`

  if (editInfo.socketId !== socketId) {
    updateEditText(editInfo.text)
  }
})

editText.onkeyup = (event) => {
  socket.emit('text-edit', editText.value)
}

editBtn.onclick = () => {
  editArea.classList.remove('hidden')
  previewArea.classList.add('hidden')
}

previewBtn.onclick = () => {
  previewArea.classList.remove('hidden')
  editArea.classList.add('hidden')
}

