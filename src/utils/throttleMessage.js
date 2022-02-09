import { Message } from 'element-ui'
let messageInstance = null
const messageType = ['error', 'success', 'info', 'warning']
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  options.duration = 1500
  messageInstance = Message(options)
}
messageType.forEach(type => {
  resetMessage[type] = (options) => {
    const data = {}
    if (typeof options === 'string') {
      data.message = options
    }
    data.type = type
    return resetMessage(data)
  }
})
export const throwMessage = resetMessage
